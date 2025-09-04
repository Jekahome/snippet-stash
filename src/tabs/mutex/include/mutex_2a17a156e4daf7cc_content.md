


<pre><code class="language-rust">
use std::sync::RwLock;
fn main(){
    let lock = RwLock::new(1);

    match lock.try_read() {
        Ok(n) => assert_eq!(*n, 1),
        Err(_) => unreachable!(),
    };
}
</code></pre>
