


<pre><code class="language-rust">
use tokio::sync::Mutex;
use std::sync::Arc;
#[tokio::main]
async fn main() {
    let data = Arc::new(Mutex::new(0));

    let data_clone = Arc::clone(&data);
    tokio::spawn(async move {
        let mut lock = data_clone.lock().await;
        *lock += 1;
    });

    let lock = data.lock().await;
    println!("Value: {}", *lock);
}
</code></pre>
