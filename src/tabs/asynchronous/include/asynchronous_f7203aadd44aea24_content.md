


<pre><code class="language-rust">
use tokio::time::{sleep, timeout, Duration};
#[tokio::main]
async fn main() {
    let fut = sleep(Duration::from_secs(3));

    match timeout(Duration::from_secs(1), fut).await {
        Ok(_) => println!("Task completed"),
        Err(_) => println!("Task timed out"),
    }
}
</code></pre>
