

Более эффективное решение для проверки кеша - ввести еще одну часть общих данных, и на этот раз соединить ее с условной переменной для сигнализации, что мы и сделаем в пятом и последнем примере.

Дополнением в этом раунде является **Condvar** и еще одна часть общих данных, «состояние кеша», которое сообщает нам для каждого ключа, готов ли кеш для чтения.
Если кеш не готов для данного ключа, рабочий поток блокирует **condvar** до тех пор, пока он не будет активирован.
Это делает нашу логику кеширования устойчивой к недетерминированности, присущей параллелизму рабочих потоков: рабочий либо находит кеш «готовым» для данного ключа, либо нет. Если нет, он ждет, пока он станет «готовым».

Это означает, что если работник «выполняет работу», связанную с данным ключом, другие рабочие, выполняющие несвязанную работу (для других ключей), могут просто выполнять свою работу параллельно, в то время как работник, выполняющий связанную работу, обнаружит, что соответствующее состояние кеша будет « не готов », и просто дождитесь, пока он станет« готовым ».
Мы избегаем потери параллелизма, которая может быть вызвана включением критического раздела в кэше «выполнение работы», сохраняя при этом детерминированный результат в случае, если работник уже «выполняет связанную работу».
<pre><code class="language-rust">
#[test]
fn fifth() {
    enum WorkMsg {
        Work(u8),
        Exit,
    }

    #[derive(Debug, Eq, PartialEq)]
    enum WorkPerformed {
        FromCache,
        New,
    }

    #[derive(Debug, Eq, PartialEq)]
    enum CacheState {
        Ready,
        WorkInProgress,
    }

    enum ResultMsg {
        Result(u8, WorkPerformed),
        Exited,
    }

    #[derive(Eq, Hash, PartialEq)]
    struct CacheKey(u8);

    let (work_sender, work_receiver) = unbounded();
    let (result_sender, result_receiver) = unbounded();
    let (pool_result_sender, pool_result_receiver) = unbounded();
    let mut ongoing_work = 0;
    let mut exiting = false;
    let pool = rayon::ThreadPoolBuilder::new()
        .num_threads(2)
        .build()
        .unwrap();
    let cache: Arc<Mutex<HashMap<CacheKey, u8>>> = Arc::new(Mutex::new(HashMap::new()));

    // A new `cache_state` shared piece of data, indicating whether for a given key,
    // the cache is ready to be read from.
    let cache_state: Arc<Mutex<HashMap<CacheKey, Arc<(Mutex<CacheState>, Condvar)>>>> =
        Arc::new(Mutex::new(HashMap::new()));

    let _ = thread::spawn(move || loop {
        select! {
            recv(work_receiver) -> msg => {
                match msg {
                    Ok(WorkMsg::Work(num)) => {
                        let result_sender = result_sender.clone();
                        let pool_result_sender = pool_result_sender.clone();
                        let cache = cache.clone();
                        let cache_state = cache_state.clone();
                        ongoing_work += 1;
                        pool.spawn(move || {
                            let num = {
                                let (lock, cvar) = {
                                    // Start of critical section on `cache_state`.
                                    let mut state_map = cache_state.lock().unwrap();
                                    &*state_map
                                        .entry(CacheKey(num.clone()))
                                        .or_insert_with(|| {
                                            Arc::new((
                                                Mutex::new(CacheState::Ready),
                                                Condvar::new(),
                                            ))
                                        })
                                        .clone()
                                    // End of critical section on `cache_state`.
                                };

                                // Start of critical section on `state`.
                                let mut state = lock.lock().unwrap();

                                // Note: the `while` loop is necessary
                                // for the logic to be robust to spurious wake-ups.
                                while let CacheState::WorkInProgress = *state {
                                    // Block until the state is `CacheState::Ready`.
                                    //
                                    // Note: this will atomically release the lock,
                                    // and reacquire it on wake-up.
                                    let current_state = cvar
                                        .wait(state)
                                        .unwrap();
                                    state = current_state;
                                }

                                // Here, since we're out of the loop,
                                // we can be certain that the state is "ready".
                                assert_eq!(*state, CacheState::Ready);

                                let (num, result) = {
                                    // Start of critical section on the cache.
                                    let cache = cache.lock().unwrap();
                                    let key = CacheKey(num);
                                    let result = match cache.get(&key) {
                                        Some(result) => Some(result.clone()),
                                        None => None,
                                    };
                                    (key.0, result)
                                    // End of critical section on the cache.
                                };

                                if let Some(result) = result {
                                    // We're getting a result from the cache,
                                    // send it back,
                                    // along with a flag indicating we got it from the cache.
                                    let _ = result_sender.send(ResultMsg::Result(result, WorkPerformed::FromCache));
                                    let _ = pool_result_sender.send(());

                                    // Don't forget to notify the waiting thread,
                                    // if any, that the state is ready.
                                    cvar.notify_one();
                                    return;
                                } else {
                                    // If we didn't find a result in the cache,
                                    // switch the state to in-progress.
                                    *state = CacheState::WorkInProgress;
                                    num
                                }
                                // End of critical section on `state`.
                            };

                            // Do some "expensive work", outside of any critical section.

                            let _ = result_sender.send(ResultMsg::Result(num.clone(), WorkPerformed::New));

                            {
                                // Start of critical section on the cache.
                                // Insert the result of the work into the cache.
                                let mut cache = cache.lock().unwrap();
                                let key = CacheKey(num.clone());
                                cache.insert(key, num);
                                // End of critical section on the cache.
                            }

                            let (lock, cvar) = {
                                let mut state_map = cache_state.lock().unwrap();
                                &*state_map
                                    .get_mut(&CacheKey(num))
                                    .expect("Entry in cache state to have been previously inserted")
                                    .clone()
                            };
                            // Re-enter the critical section on `state`.
                            let mut state = lock.lock().unwrap();

                            // Here, since we've set it earlier,
                            // and any other worker would wait
                            // on the state to switch back to ready,
                            // we can be certain the state is "in-progress".
                            assert_eq!(*state, CacheState::WorkInProgress);

                            // Switch the state to ready.
                            *state = CacheState::Ready;

                            // Notify the waiting thread, if any, that the state has changed.
                            // This can be done while still inside the critical section.
                            cvar.notify_one();

                            let _ = pool_result_sender.send(());
                        });
                    },
                    Ok(WorkMsg::Exit) => {
                        exiting = true;
                        if ongoing_work == 0 {
                            let _ = result_sender.send(ResultMsg::Exited);
                            break;
                        }
                    },
                    _ => panic!("Error receiving a WorkMsg."),
                }
            },
            recv(pool_result_receiver) -> _ => {
                if ongoing_work == 0 {
                    panic!("Received an unexpected pool result.");
                }
                ongoing_work -=1;
                if ongoing_work == 0 && exiting {
                    let _ = result_sender.send(ResultMsg::Exited);
                    break;
                }
            },
        }
    });

    let _ = work_sender.send(WorkMsg::Work(0));
    let _ = work_sender.send(WorkMsg::Work(1));
    let _ = work_sender.send(WorkMsg::Work(1));
    let _ = work_sender.send(WorkMsg::Exit);

    let mut counter = 0;

    // A new counter for work on 1.
    let mut work_one_counter = 0;

    loop {
        match result_receiver.recv() {
            Ok(ResultMsg::Result(num, cached)) => {
                counter += 1;

                if num == 1 {
                    work_one_counter += 1;
                }

                // Now we can assert that by the time
                // the second result for 1 has been received,
                // it came from the cache.
                if num == 1 && work_one_counter == 2 {
                    assert_eq!(cached, WorkPerformed::FromCache);
                }
            }
            Ok(ResultMsg::Exited) => {
                assert_eq!(3, counter);
                break;
            }
            _ => panic!("Error receiving a ResultMsg."),
        }
    }
}
</code></pre>
