


<pre><code class="language-rust">
use std::cell::RefCell;
use std::cell::{Ref,RefMut};
fn main(){
    let c = RefCell::new(5);

    let borrowed_five = c.borrow();
    let borrowed_five2 = c.borrow(); 
    An example of panic:

    use std::cell::RefCell;
    use std::thread;

    let result = thread::spawn(move || {
       let c = RefCell::new(5_i32);
       let m:RefMut<'_, i32> = c.borrow_mut();

       let b:Ref<'_, i32> = c.borrow(); // this causes a panic
    }).join();

    assert!(result.is_err());
}
</code></pre>
