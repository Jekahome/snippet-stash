


<pre><code class="language-rust">
#[tokio::main]
async fn main() {
    tokio::task::block_in_place(|| {
        // Блокирующий код
        std::thread::sleep(std::time::Duration::from_secs(1));
        println!("Blocking operation completed");
    });
}
</code></pre>
