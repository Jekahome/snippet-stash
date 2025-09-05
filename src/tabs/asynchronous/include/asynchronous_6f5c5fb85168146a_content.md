


<pre><code class="language-rust">
use futures::future::{poll_fn, FutureExt};
use std::task::{Context, Poll};
use std::time::{Duration, Instant};
use tokio::time::sleep;

#[tokio::main]
async fn main() {
    let start_time = Instant::now();
    let my_future = poll_fn(|cx| {
        if start_time.elapsed() >= Duration::from_secs(2) {
            Poll::Ready(42) // Возвращаем результат, если прошло достаточно времени
        } else {
            cx.waker().wake_by_ref(); // Указываем, что нужно вызвать poll снова
            Poll::Pending
        }
    });
    let result = my_future.await;
    println!("Future completed with result: {}", result);
}
</code></pre>
