


<pre><code class="language-rust">
use tokio::io::{self, AsyncWriteExt};
use tokio::fs::File;
#[tokio::main]
async fn main() {
    let mut file = File::create("example.txt").await.unwrap();
    file.write_all(b"Hello, Tokio!").await.unwrap();
}
</code></pre>
