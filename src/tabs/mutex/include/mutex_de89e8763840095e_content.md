


<pre><code class="language-rust">
use parking_lot::Mutex;
use std::thread;

fn main() {
    let data = Mutex::new(0);

    let handles: Vec<_> = (0..10).map(|_| {
        let data = data.clone();
        thread::spawn(move || {
            let mut lock = data.lock();
            *lock += 1;
        })
    }).collect();

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Result: {}", *data.lock());
}
</code></pre>
