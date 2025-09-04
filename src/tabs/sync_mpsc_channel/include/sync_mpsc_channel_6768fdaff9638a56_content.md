


<pre><code class="language-rust">
extern crate crossbeam;
use crossbeam_channel as channel;
fn main(){
    let (s, r) = channel::unbounded();
    crossbeam::scope(|scope| {
        // Spawn a thread that sends one message and then receives one.
        scope.spawn(|| {
            s.send(1);
            r.recv().unwrap();
        });
        // Spawn another thread that does the same thing.
        scope.spawn(|| {
            s.send(2);
            r.recv().unwrap();
        });
    });
}
</code></pre>
