


<pre><code class="language-rust">
use tokio::time::{sleep, Duration};
#[tokio::main]
async fn main() {
    println!("Start sleeping...");
    sleep(Duration::from_secs(2)).await;
    println!("Finished sleeping!");
}
</code></pre>
