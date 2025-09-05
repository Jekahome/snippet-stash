

<pre><code class="language-rust">
use std::future::Future;
use std::task::{Context, Poll};
use futures::task::noop_waker;

async fn my_async_function() -> u32 {  42 }

fn main() {
        let fut:impl Future<Output=u32> = my_async_function(); // Получаем Future
        let mut pinned = Box::pin(fut); // Оборачиваем в Pin<Box<...>>

        let waker = noop_waker();
        let mut context = Context::from_waker(&waker);

        match pinned.as_mut().poll(&mut context) {
            Poll::Ready(val) => println!("Future completed with value: {}", val),
            Poll::Pending => println!("Future is still pending"),
        }
}
</code></pre>
