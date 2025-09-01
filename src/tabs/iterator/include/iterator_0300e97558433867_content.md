


<pre><code class="language-rust">
use futures::stream::{self, StreamExt};

#[tokio::main]
async fn main() {
    let mut stream = stream::iter(vec![1, 2, 3]);
    while let Some(val) = stream.next().await {
        println!("{}", val);
    }
}

</code></pre>
