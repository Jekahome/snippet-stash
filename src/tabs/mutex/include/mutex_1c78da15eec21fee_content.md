


<pre><code class="language-rust">
use std::sync::RwLock;
fn main(){
    let lock = RwLock::new(String::new());
    {
        let mut s = lock.write().unwrap();
        *s = "modified".to_owned();
    }
    assert_eq!(lock.into_inner().unwrap(), "modified");
}
</code></pre>
