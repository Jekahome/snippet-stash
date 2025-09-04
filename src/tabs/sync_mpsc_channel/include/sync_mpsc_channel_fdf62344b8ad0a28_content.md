

Crate flume — это библиотека для асинхронных и синхронных каналов, обеспечивающая удобный и мощный интерфейс для передачи сообщений между потоками или задачами. Flume предоставляет альтернативу стандартным каналам Rust (std::sync::mpsc) и каналам из Tokio, с акцентом на производительность и удобство использования.

Предоставляет богатую функциональность, включая таймауты, выборку (select) сообщений из нескольких каналов и поддержку AsyncRead/AsyncWrite.
<pre><code class="language-rust">
use flume::{unbounded, Selector};

fn main() {
    let (tx1, rx1) = unbounded();
    let (tx2, rx2) = unbounded();

    let selector = Selector::new()
        .recv(&rx1, |msg| println!("Received from channel 1: {}", msg))
        .recv(&rx2, |msg| println!("Received from channel 2: {}", msg));

    std::thread::spawn(move || {
        tx1.send("Message 1").unwrap();
        tx2.send("Message 2").unwrap();
    });

    selector.wait(); // Ожидаем сообщение из любого канала
}
</code></pre>
