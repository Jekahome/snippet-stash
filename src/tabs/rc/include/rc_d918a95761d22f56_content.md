

Вызов обновления по возвращаемому значению всегда дает None   
<pre><code class="language-rust">
fn main(){            
    use std::rc::Weak;
    let empty: Weak<i64> = Weak::new();
    assert!(empty.upgrade().is_none());
}
</code></pre>
