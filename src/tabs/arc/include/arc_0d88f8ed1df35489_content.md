

Получает количество сильных указателей strong (Arc) для этого значения.
<pre><code class="language-rust">
use std::sync::Arc;
fn main(){
    let five = Arc::new(5);
    let _also_five = Arc::clone(&five);
    assert_eq!(2, Arc::strong_count(&five));
}
</code></pre>

---

Получает количество слабых указателей Weak на это значение.
<pre><code class="language-rust">
use std::sync::Arc;
fn main(){
    let five = Arc::new(5);
    assert_eq!(1, Arc::weak_count(&five));
}
</code></pre>
