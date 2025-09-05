


Кастомная реализация исполнителя
  
<details>

<summary>...</summary>

<pre><code class="language-rust">

mod custom_executor{

    use std::future::Future;
    use std::task::{Context, Poll, Waker};
    use std::sync::{Arc, Mutex};
    use std::collections::VecDeque;
    use std::pin::Pin;
    use std::time::{Duration, Instant};
    use std::thread;
    use std::sync::mpsc;
    
    struct Task {
        future: Mutex<Pin<Box<dyn Future<Output = ()> + Send>>>,
        waker: Mutex<Option<Waker>>,
    }
    
    struct Executor {
        tasks: Arc<Mutex<VecDeque<Arc<Task>>>>,
    }
    
    impl Executor {
        fn new() -> Self {
            Executor {
                tasks: Arc::new(Mutex::new(VecDeque::new())),
            }
        }
    
        fn spawn(&self, future: impl Future<Output = ()> + Send + 'static) {
            let task = Arc::new(Task {
                future: Mutex::new(Box::pin(future)),
                waker: Mutex::new(None),
            });
            self.tasks.lock().unwrap().push_back(task);
        }
    
        fn run(&self) {
            while let Some(task) = self.tasks.lock().unwrap().pop_front() {
                let waker = waker_fn::waker_fn({
                    let task = task.clone(); // Клонируем `task` для того, чтобы создать новый указатель.
                    move || {
                        task.waker.lock().unwrap().take().map(|w| w.wake());
                    }
                });
    
                let mut context = Context::from_waker(&waker);
                let mut future = task.future.lock().unwrap();
                let poll_result = future.as_mut().poll(&mut context);
                drop(future); // Освобождаем блокировку перед повторным использованием `task`.
    
                if let Poll::Pending = poll_result {
                    // Если задача не завершена, возвращаем её в очередь.
                    self.tasks.lock().unwrap().push_back(task);
                }
                // Если задача завершена (Poll::Ready), она больше не добавляется обратно в очередь.
            }
        }
    }
    
    /// Модуль waker_fn отвечает за создание Waker — объекта, который позволяет пробуждать задачи в контексте асинхронного выполнения. 
    /// В асинхронной среде Waker используется для уведомления системы о том, что задача готова 
    /// к выполнению и должна быть снова поставлена в очередь для планирования.
    mod waker_fn {
        use std::sync::Arc;
        use std::task::{RawWaker, RawWakerVTable, Waker};
    
        type FnPtr = Arc<dyn Fn() + Send + Sync>;
    
        pub fn waker_fn(f: impl Fn() + Send + Sync + 'static) -> Waker {
            let data = Arc::new(f) as FnPtr;
            unsafe {
                let raw_waker = raw_waker(Arc::into_raw(data.into()));
                Waker::from_raw(raw_waker)
            }
        }
    
        unsafe fn raw_waker(data: *const FnPtr) -> RawWaker {
            RawWaker::new(
                data as *const (),
                &RawWakerVTable::new(clone, wake, wake_by_ref, drop_data),
            )
        }
    
        unsafe fn clone(data: *const ()) -> RawWaker {
            let arc = Arc::from_raw(data as *const FnPtr);
            let cloned = Arc::clone(&arc);
            std::mem::forget(arc);
            raw_waker(Arc::into_raw(cloned))
        }
    
        unsafe fn wake(data: *const ()) {
            let arc = Arc::from_raw(data as *const FnPtr);
            arc();
        }
    
        unsafe fn wake_by_ref(data: *const ()) {
            let arc = Arc::from_raw(data as *const FnPtr);
            arc();
            std::mem::forget(arc);
        }
    
        unsafe fn drop_data(data: *const ()) {
            drop(Arc::from_raw(data as *const FnPtr));
        }
    }
    
    async fn simple_sleep(duration: Duration) {
        let start = Instant::now();
        while start.elapsed() < duration {
            // Простой способ задержки без использования сторонних библиотек.
            thread::sleep(Duration::from_millis(100));
        }
    }
    
    pub fn run() {
        let executor = Executor::new();
        let my_future = async {
            println!("Task 1 started");
            simple_sleep(Duration::from_secs(1)).await;
            println!("Task 1 completed");
        };

        executor.spawn(my_future);
    
        executor.spawn(async {
            println!("Task 2 started");
            simple_sleep(Duration::from_secs(2)).await;
            println!("Task 2 completed");
        });
    
        executor.run();
    }
}
fn main(){
    custom_executor::run();
}
 
</code></pre>

</details>




