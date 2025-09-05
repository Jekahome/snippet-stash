


<pre><code class="language-rust">
fn main(){
    let task:_ = MyTask(""bla"".to_string());
    // let mut buf:VecDeque<Box<Future<Item = (), Error = ()>>> = VecDeque::new();
    // buf.push_back(Box::new(task));
    // let mut exec:SpinExecutor = SpinExecutor{tasks:buf};
    // exec.run();

    let mut exec:SpinExecutorNew = SpinExecutorNew{ready_tasks:buf,not_ready_tasks:VecDeque::new()};
    exec.spawn(Box::new(MyTask(""bla2"".to_string())));
    exec.spawn(Box::new(MyTask(""bla3"".to_string())));
    exec.run();
    //---------------------- изменение типа future (map, map_err);
    //map  преобразование future возвращает теперь u32
    let mut new_future = get_future(""11"".to_string()).map(|string| {
        string.parse::<u32>().unwrap()
    });
    //----------------------  futures::future::select_all получает результат из цикла событий
    let v=vec![ futures::future::result::<String, ()>(Ok(""result"".to_string()))];
    let (i, idx, v)  = futures::future::select_all(v).wait().ok().unwrap();
    println!(""{:?}"", i);
    //---------------------- запуск другого future, когда исходный будет выполнен (then, and_then, or_else)
    //and_then  вызов следующего future после успеха предыдущего
    let f = get_future(""future1"".to_string())
    .and_then(|res|{
        println!(""Второй Future  "");
        get_future(res)
    })
    .and_then(|res|{
        println!(""Третий Future  "");
        futures::future::ok::<String, ()>(""ok"".to_string())
    })
    .and_then(|res|{
        println!(""Четвертый Future  "");
        futures::lazy(|| {
            println!(""lazy."");
            futures::future::ok::<String, ()>(""lazy"".to_string())
        })
    })
    .and_then(|res|{
        println!(""Пятый Future  "");
        get_future_result()
    }).and_then(|res|{
        println!(""Шестой Future  "");
        futures::future::result::<String, ()>(Ok(""result"".to_string()))
    });

    fn get_future_result()-> futures::future::FutureResult<String, ()>{
        futures::future::ok(""ok"".to_string())
    }
    // Исполнители простой цикл перебора futures пока не вернуть готовый результат  Async::Ready
    let mut exec:SpinExecutorNew = SpinExecutorNew{ready_tasks:VecDeque::new(),not_ready_tasks:VecDeque::new()};
    exec.spawn(Box::new(  f ));
    exec.run();

    //let mut buf:VecDeque<Box<Future<Item = String, Error = ()>>> = VecDeque::new();
    //buf.push_back(Box::new( f ));
    //let mut exec:SpinExecutor = SpinExecutor{tasks:buf};
    //exec.run();
    //--------------------- futures::future::loop_fn создает цикл событий для объекта
    let ping_til_done = futures::future::loop_fn(Client::new(), |client| {
        client.send_ping()
        .and_then(|client| client.receive_pong())
        .and_then(|(client, done)| {// сами решаем из результата как крутить цикл
            if done {
               Ok(futures::future::Loop::Break(client))// остановить
            } else {
               Ok(futures::future::Loop::Continue(client)) // продолжить
            }
        })
    });
    println!(""{:?}"",  ping_til_done.wait().unwrap());// Client { ping_count: 5 }

    let v=vec![ ping_til_done ];
    let (i, idx, v)  = futures::future::select_all(v).wait().ok().unwrap();
    println!(""{:?}"", i);
    //--
    println!(""{:?}"", futures::executor::spawn( MyTask(""11"".to_string()).poll()) );
}
</code></pre>
