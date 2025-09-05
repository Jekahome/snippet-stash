

В настоящее время язык программирования Rust не поддерживает асинхронные for циклы.  
<pre><code class="language-rust">
use tokio_stream::StreamExt;
#[tokio::main]
async fn main() {
    let mut stream = tokio_stream::iter(&[1, 2, 3])
     .take(3)
     .filter(|msg|{
         if **msg == 1 {
            return false;
         }
         true
     }).map(|msg|*msg+10);

    while let Some(v) = stream.next().await {
        println!("GOT = {:?}", v);
    }
}
</code></pre>
