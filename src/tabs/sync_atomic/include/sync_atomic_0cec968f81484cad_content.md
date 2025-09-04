


<pre><code class="language-rust">
use std::sync::Arc;
use std::sync::atomic::{AtomicUsize, Ordering};
use std::thread;
fn main() {
    let counter = Arc::new(AtomicUsize::new(0));
    let handles: Vec<_> = (0..10)
        .map(|_| {
            let counter = Arc::clone(&counter);
            thread::spawn(move || {
                counter.fetch_add(1, Ordering::SeqCst);
            })
        })
        .collect();
    for handle in handles {
        handle.join().expect("Thread panicked");
    }
    println!("Counter: {}", counter.load(Ordering::SeqCst));
}

</code></pre>


то же самое, но в scope:
<pre><code class="language-rust">
fn main(){
    let counter = Arc::new(AtomicUsize::new(0));  
    thread::scope(|s| { 
        for n_thread in 1..=10 {
            let counter = Arc::clone(&counter);
            let _ = thread::Builder::new().name(format!("{n_thread}"))
                .spawn_scoped(s,move || {
                    counter.fetch_add(1, Ordering::SeqCst);
            }).unwrap();            
        }
    }); 
    println!("Counter: {}", counter.load(Ordering::SeqCst));
}
</code></pre>
