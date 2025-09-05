

<pre><code class="language-rust">
use futures::future::{self, Shared};
use futures::FutureExt; // Для метода `shared`

async fn async_task() -> u32 {
    // Здесь могут быть более сложные асинхронные операции, например, сетевые запросы или вычисления
    42
}
#[tokio::main]
async fn main() {
    let shared_future = async_task().shared();
    let future_clone1 = shared_future.clone();
    let future_clone2 = shared_future.clone();
    let result1 = future_clone1.await;
    println!("Result from first clone: {}", result1);
    let result2 = future_clone2.await;
    println!("Result from second clone: {}", result2);
}
</code></pre>
