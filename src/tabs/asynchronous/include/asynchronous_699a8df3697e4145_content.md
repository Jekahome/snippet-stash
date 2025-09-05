


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
