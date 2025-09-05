


<pre><code class="language-rust">
use tokio::time::{sleep, Duration};
async fn fast_task() -> &'static str {
    sleep(Duration::from_secs(1)).await; // Быстрая задача (завершается через 1 секунду)
    "Fast task completed"
}
async fn slow_task() -> &'static str {
    sleep(Duration::from_secs(3)).await; // Медленная задача (завершается через 3 секунды)
    "Slow task completed"
}

#[tokio::main]
async fn main() {
    tokio::select! {
        result = fast_task() => {
            println!("{}", result); // Этот блок выполнится первым
        }
        result = slow_task() => {
            println!("{}", result);
        }
    }
    println!("One of the tasks completed!");
}
</code></pre>
