

Когда использовать postage?
Если проект не использует Tokio или хочет быть независимым от рантайма.
Если нужен лёгкий и минималистичный API для асинхронных каналов.
В приложениях, где важна многопоточная или многозадачная асинхронная коммуникация.
<pre><code class="language-rust">
use postage::prelude::*;
use postage::broadcast;
use async_std::task;

#[async_std::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut sender = broadcast::channel(16).0;
    let mut receiver1 = sender.subscribe();
    let mut receiver2 = sender.subscribe();

    task::spawn(async move {
        while let Some(msg) = receiver1.recv().await {
            println!("Receiver 1 got: {}", msg);
        }
    });

    task::spawn(async move {
        while let Some(msg) = receiver2.recv().await {
            println!("Receiver 2 got: {}", msg);
        }
    });

    sender.send("Hello, World!").await?;
    sender.send("Another message").await?;

    Ok(())
}
</code></pre>
