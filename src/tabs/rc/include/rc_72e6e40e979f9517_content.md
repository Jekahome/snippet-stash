


<pre><code class="language-rust">
use std::rc::Rc;
fn main(){
    let first_rc = Rc::new(5);
    let first = Rc::downgrade(&first_rc);
    let second = Rc::downgrade(&first_rc);

    assert!(first.ptr_eq(&second));

    let third_rc = Rc::new(5);
    let third = Rc::downgrade(&third_rc);

    assert!(!first.ptr_eq(&third));
}
</code></pre>

---

Сравнение с Weak::new
<pre><code class="language-rust">
use std::rc::{Rc, Weak};
fn main(){
    let first = Weak::new();
    let second = Weak::new();
    assert!(first.ptr_eq(&second));

    let third_rc = Rc::new(());
    let third = Rc::downgrade(&third_rc);
    assert!(!first.ptr_eq(&third));
}
</code></pre>
