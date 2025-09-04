


<pre><code class="language-rust">
use std::sync::RwLock;
fn main(){
    let lock = RwLock::new(1);

    let mut n = lock.write().unwrap();
    *n = 2;
    assert!(lock.try_read().is_err());
}
</code></pre>
