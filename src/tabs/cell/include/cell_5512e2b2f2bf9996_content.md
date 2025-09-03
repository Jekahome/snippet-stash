


<pre><code class="language-rust">
use std::cell::RefCell;
fn main(){
    let c = RefCell::new(5);

    *c.borrow_mut() = 7;

    assert_eq!(*c.borrow(), 7);
}
</code></pre>


An example of panic:
<pre><code class="language-rust">
use std::cell::RefCell;
use std::thread;
fn main(){
    let result = thread::spawn(move || {
       let c = RefCell::new(5);
       let m = c.borrow();

       let b = c.borrow_mut(); //  panic
    }).join();

    assert!(result.is_err());
}
</code></pre>
