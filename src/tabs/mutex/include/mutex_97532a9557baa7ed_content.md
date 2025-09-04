


<pre><code class="language-rust">
use parking_lot::{Condvar, Mutex};
use std::thread;

fn main() {
    let pair = Mutex::new(false);
    let condvar = Condvar::new();

    let thread = thread::spawn({
        let pair = &pair;
        let condvar = &condvar;
        move || {
            let mut lock = pair.lock();
            *lock = true;
            condvar.notify_one();
        }
    });

    let mut lock = pair.lock();
    while !*lock {
        condvar.wait(&mut lock);
    }

    println!("Condition met!");
    thread.join().unwrap();
}
</code></pre>
