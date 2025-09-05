

Преобразовать sync::mpsc::Receiver в impl Stream.
<pre><code class="language-rust">
use tokio::sync::mpsc;
fn main(){
    let (tx, mut rx) = mpsc::channel::<usize>(16);
    let stream = async_stream::stream! {
        while let Some(item) = rx.recv().await {
            yield item;
        }
    };
}
</code></pre>
