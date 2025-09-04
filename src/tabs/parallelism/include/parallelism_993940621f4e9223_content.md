


<pre><code class="language-rust">
use std::sync::{Arc, Mutex, MutexGuard, Condvar}; 
use std::time::{Instant, Duration};
use std::thread;
use std::sync::atomic::{AtomicUsize, Ordering};
fn main(){
    let data = vec![1, 2, 3, 4];
  
    let idx = Arc::new(AtomicUsize::new(0));
    let other_idx = idx.clone();
    
    thread::spawn(move || {
        other_idx.fetch_add(10, Ordering::SeqCst);
    });
    
    thread::sleep(std::time::Duration::from_millis(100));
    println!("{}", data[idx.load(Ordering::SeqCst)]);  // panic вышли за пределы мыссива, так как idx мог успеть увеличится сверх диапазона массива
}
</code></pre>
