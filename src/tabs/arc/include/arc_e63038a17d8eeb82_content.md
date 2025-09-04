


<pre><code class="language-rust">
use std::sync::Arc;
fn main(){
    let five = Arc::new(5);
    let same_five = Arc::clone(&five);
    let other_five = Arc::new(5);
    assert!(Arc::ptr_eq(&five, &same_five));
    assert!(!Arc::ptr_eq(&five, &other_five));
}
</code></pre>
