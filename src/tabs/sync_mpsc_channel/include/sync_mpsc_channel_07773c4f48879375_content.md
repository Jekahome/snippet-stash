

В стандартной библиотеке Rust мы можем выбирать между использованием канала по умолчанию std::sync::mpsc::**channel**, который поставляется с отправителем с неограниченным буфером и, следовательно, никогда не блокирует отправку, и std::sync::mpsc::**sync_channel**, который поставляется с **SyncSender**, который блокирует отправку, если буфер заполнен.
<pre><code class="language-rust">
use std::sync::mpsc::{sync_channel, SyncSender, Receiver};
use std::thread;
fn main() {
    let (sender, receiver):(SyncSender<i32>,Receiver<i32>) = sync_channel(1);
    // this returns immediately
    sender.send(1).unwrap();
    
    thread::spawn(move|| {
        // this will block until the previous message has been received
        sender.send(2).unwrap();
    });
    assert_eq!(receiver.recv().unwrap(), 1);
    assert_eq!(receiver.recv().unwrap(), 2);
}
</code></pre>
