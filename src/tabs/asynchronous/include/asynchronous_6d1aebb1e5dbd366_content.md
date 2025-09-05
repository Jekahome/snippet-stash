


<pre><code class="language-rust">
use tokio::signal;
#[tokio::main]
async fn main() {
    println!("Press Ctrl+C to exit");

    signal::ctrl_c().await.unwrap();
    println!("Received Ctrl+C, shutting down.");
}
</code></pre>
