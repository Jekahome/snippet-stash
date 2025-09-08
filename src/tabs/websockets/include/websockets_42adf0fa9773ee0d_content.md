


<pre><code class="language-rust no_run edition2024">
use tokio::net::TcpListener;
use tokio_tungstenite::accept_async;
use futures_util::{StreamExt, SinkExt};

#[tokio::main]
async fn main() {
    let listener = TcpListener::bind("127.0.0.1:9001").await.unwrap();
    while let Ok((stream, _)) = listener.accept().await {
        tokio::spawn(async move {
            let ws_stream = accept_async(stream).await.unwrap();
            let (mut write, mut read) = ws_stream.split();

            while let Some(msg) = read.next().await {
                let msg = msg.unwrap();
                write.send(msg).await.unwrap(); // echo back
            }
        });
    }
}
</code></pre>
