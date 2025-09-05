


<pre><code class="language-rust">
#[tokio::main]
async fn main() {
    let handle:tokio::task::JoinHandle = tokio::spawn(async {
        // Do some async work
        "return value"
    });

    // Выполняйте другую работу
    let out = handle.await.unwrap();
    println!("GOT {}", out);
}
</code></pre>
