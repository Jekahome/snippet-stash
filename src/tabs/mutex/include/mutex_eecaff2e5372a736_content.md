


<pre><code class="language-rust">
use std::sync::RwLock;
fn main(){
    let lock = RwLock::new(1);
    let n = lock.read().unwrap();
    assert_eq!(*n, 1);
    assert!(lock.try_write().is_err());
}
</code></pre>

---
 
<pre><code class="language-rust">
use std::sync::RwLock;
fn main() {
    let my_rwlock = RwLock::new(5);

    let read1 = my_rwlock.read().unwrap();
    let read2 = my_rwlock.read().unwrap();

    if let Ok(mut number) = my_rwlock.try_write() {
        *number += 10;
        println!("Now the number is {}", number);
    } else {
        println!("Couldn't get write access, sorry!")
    };
}
</code></pre>
