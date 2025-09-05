


<pre><code class="language-rust">
use tokio::sync::mpsc;
#[tokio::main]
async fn main() {
    let (tx, mut rx) = mpsc::channel(32);

    tokio::spawn(async move {
        tx.send("Hello, world!").await.unwrap();
    });

    while let Some(message) = rx.recv().await {
        println!("Received: {}", message);
    }
}
</code></pre>

---

<pre><code class="language-rust">
// std::sync::mpsc (блокирует поток)
use std::sync::mpsc;
use std::thread;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        tx.send("Message").unwrap();
    });

    // Блокирует выполнение потока, пока не появятся данные
    let message = rx.recv().unwrap();
    println!("Received: {}", message);
}

</code></pre>
