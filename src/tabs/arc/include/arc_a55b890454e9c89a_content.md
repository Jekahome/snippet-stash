

Clone:
<pre><code class="language-rust">
fn main(){
    let val = Arc::new(AtomicUsize::new(5));
    let val = Arc::clone(&val);
}
</code></pre>

---

Default:
<pre><code class="language-rust">
fn main(){
    let x: Arc<i32> = Default::default();
    assert_eq!(*x, 0);
}
</code></pre>

---

`From<&str>`:
<pre><code class="language-rust">
fn main(){
    let shared: Arc<str> = Arc::from("eggplant");
}
</code></pre>

---

Defer:
<pre><code class="language-rust">
fn main(){
    let val = Arc::new(AtomicUsize::new(5));
    val.fetch_add(1, Ordering::SeqCst); // метод fetch_add через Deref взят у AtomicUsize
}
</code></pre>

---

Defer:
<pre><code class="language-rust">
use std::sync::Arc;
use std::sync::atomic::{AtomicUsize, Ordering};
use std::thread;
fn main(){
    let val = Arc::new(AtomicUsize::new(5));

    for _ in 0..10 {
        let val = Arc::clone(&val);

        thread::spawn(move || {
            let v = val.fetch_add(1, Ordering::SeqCst);// метод fetch_add через Deref взят у atomic AtomicUsize
            println!("{:?}", v);
        });
    }
}
</code></pre>
