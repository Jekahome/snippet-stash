

<pre><code class="language-rust">
use std::sync::mpsc::channel;
use std::thread;
fn main(){
    let (send, recv) = channel();

    thread::spawn(move || {
        send.send(1).unwrap();
        send.send(2).unwrap();
        send.send(3).unwrap();
    });

    let mut iter = recv.iter();
    assert_eq!(iter.next(), Some(1));
    assert_eq!(iter.next(), Some(2));
    assert_eq!(iter.next(), Some(3));
    assert_eq!(iter.next(), None);
}
</code></pre>
