


<pre><code class="language-rust">
use tokio::fs;
#[tokio::main]
async fn main() {
    let data = "Hello, Tokio!";
    fs::write("example.txt", data).await.unwrap();

    let content = fs::read_to_string("example.txt").await.unwrap();
    println!("File content: {}", content);
}
</code></pre>
