


<pre><code class="language-rust">
use std::rc::Rc;
use std::borrow::Borrow;
use std::cell::RefCell;
fn main() {
    let rc:Rc<RefCell<String>> = Rc::new(RefCell::new("hello".to_string()));
    let rc_shared = Rc::clone(&rc);
   
    let rw_rc_borro:&RefCell<String> = Rc::borrow(&rc);
    (*rw_rc_borro.borrow_mut()).push_str("..."); 

    let rw_rc_borro:&RefCell<String> = Rc::borrow(&rc_shared);
    (*rw_rc_borro.borrow_mut()).push_str("***"); 

    assert_eq!("hello...***".to_string(), (*rc).take());
}
</code></pre>
