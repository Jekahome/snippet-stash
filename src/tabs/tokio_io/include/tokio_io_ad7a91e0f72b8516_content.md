


<pre><code class="language-rust">
use tokio_stream::{self as stream, StreamExt};

#[tokio::main]
async fn main() {
    let doubled: Vec<i32> =
        stream::iter(vec![1, 2, 3])
            .map(|x| x * 2)
            .collect()
            .await;

    assert_eq!(vec![2, 4, 6], doubled);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let content = String::from("Mary had a little lamb");
    let mut stream = tokio_stream::iter(content.split(" "))
    .map(|msg|msg.to_uppercase());
    // let content: Vec<String> = stream.collect().await;    
    while let Some(v) = stream.next().await {
        println!("GOT = {:?}", v);
    }
}
</code></pre>
