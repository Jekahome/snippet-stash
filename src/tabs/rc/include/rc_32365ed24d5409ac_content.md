

Разделяется между несколькими владельцами, уникальной ссылки быть не может
<pre><code class="language-rust">
use std::rc::Rc;
fn main() {
    let original: String = "statue".to_owned();
    let shared: Rc<str> = Rc::from(original);
    let rc_shared: Rc<str> = Rc::clone(&shared);
    let rc_shared2: Rc<str> = Rc::clone(&shared);
    let cap:String = rc_shared2.repeat(4); // Deref
}
</code></pre>
