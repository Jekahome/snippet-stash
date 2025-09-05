


<pre><code class="language-rust">
mod not_busy_waiting{
    use std::future::Future;
    use std::pin::Pin;
    use std::task::{Context, Poll, Waker};
    use std::time::{Duration, Instant};
    use std::thread;
    use futures::task::{waker_ref, noop_waker_ref, ArcWake};
    use std::sync::{Arc, Mutex};
    use tokio::time::{sleep, Sleep};

    struct DelayedFuture {
        start_time: Instant,
        delay_duration: Duration,
        waker: Option<Waker>, // Поле для хранения Waker-а
    }
    
    impl DelayedFuture {
        fn new(delay_duration: Duration) -> Self {
            DelayedFuture {
                start_time: Instant::now(),
                delay_duration,
                waker: None,
            }
        }
    }
    impl Future for DelayedFuture {
        type Output = u32;
    
        fn poll(mut self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Self::Output> {
            if self.start_time.elapsed() >= self.delay_duration {
                // Если прошло достаточно времени, возвращаем Poll::Ready
                Poll::Ready(42)
            } else {
                // Если еще не прошло время, сохраняем waker, чтобы пробудить его позже
                if self.waker.is_none() {
                    self.waker = Some(cx.waker().clone());
                    // Здесь мы бы регистрировали `waker` с таймером или другим механизмом,
                    // который пробудит `Future`, когда пройдет нужное время.
                    let delay = self.delay_duration - self.start_time.elapsed();
                    let waker_clone = self.waker.as_ref().unwrap().clone();
                    tokio::spawn(async move {
                        sleep(delay).await;
                        waker_clone.wake();
                    });
                }
                // Указываем, что `Future` еще не готов
                Poll::Pending
            }
        }
    }
    #[tokio::main]
    pub async fn run() {
        let delay_duration = Duration::from_secs(5);
        let mut future = DelayedFuture::new(delay_duration);

        // Параллельно с ожиданием можно запускать таймер, который ограничивыет время ожидания Future
        /*let result = tokio::time::timeout(delay_duration, async {
            future.await
        })
        .await;
    
        match result {
            Ok(42) => println!("Future completed successfully!"),
            Ok(_) => println!("Unexpected result."),
            Err(_) => println!("Future did not complete in time."),
        }    
       */

        // но можно и без дополнительно ограничения
        match future.await {
            42 => println!("Future completed successfully!"),
            _ => println!("Unexpected result."),
        }
    }
}
fn main(){
    not_busy_waiting::run();
}
</code></pre>
