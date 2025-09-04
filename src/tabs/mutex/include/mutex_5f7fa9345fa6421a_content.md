


<pre><code class="language-rust">
use std::sync::RwLock;
use std::mem::drop; 
fn main() {
    let my_rwlock = RwLock::new(5);

    let read1 = my_rwlock.read().unwrap();
    let read2 = my_rwlock.read().unwrap();

    println!("{:?}, {:?}", read1, read2);

    drop(read1);
    drop(read2); // we dropped both, so we can use .write() now

    let mut write1 = my_rwlock.write().unwrap();
    *write1 = 6;
    std::mem::drop(write1);
    println!("{:?}", my_rwlock);
}
</code></pre>
