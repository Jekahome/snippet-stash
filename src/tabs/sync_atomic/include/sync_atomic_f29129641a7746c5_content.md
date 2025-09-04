


<pre><code class="language-rust">
use std::sync::atomic::{AtomicUsize, Ordering};

static CALL_COUNT: AtomicUsize = AtomicUsize::new(0);

fn do_a_call() {
    CALL_COUNT.fetch_add(1, Ordering::SeqCst);
}
fn main() {
    do_a_call();
    do_a_call();
    do_a_call();

    println!("called {}", CALL_COUNT.load(Ordering::SeqCst));
}
</code></pre>

---
 
<pre><code class="language-rust">
#[macro_use]
extern crate lazy_static;
use std::sync::Mutex;

lazy_static! {
    static ref ARRAY: Mutex<Vec<u8>> = Mutex::new(vec![]);
}

fn do_a_call() {
    ARRAY.lock().unwrap().push(1);
}
fn main(){
    do_a_call();
    do_a_call();
    do_a_call();

    println!("called {}", ARRAY.lock().unwrap().len());
}
</code></pre>
