

<pre><code class="language-rust">
use std::sync::RwLock;
fn main(){
    let mut lock = RwLock::new(0);
    *lock.get_mut().unwrap() = 10;
    assert_eq!(*lock.read().unwrap(), 10);
}
</code></pre>
