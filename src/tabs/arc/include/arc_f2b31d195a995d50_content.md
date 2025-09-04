

Возвращает содержащееся значение, если Arc имеет ровно одну сильную ссылку.
В противном случае возвращается Err с данными
<pre><code class="language-rust">
use std::sync::Arc;
fn main(){
    let x = Arc::new(3);
    assert_eq!(Arc::try_unwrap(x), Ok(3));

    let x = Arc::new(4);
    let _y = Arc::clone(&x);
    println!("{:?}",Arc::try_unwrap(x));// Err(4)
}
</code></pre>

---

<pre><code class="language-rust">
use std::sync::Arc;
fn main(){
    let x = Arc::new(3);
    let y = Arc::clone(&x);
    let x_thread = std::thread::spawn(|| Arc::into_inner(x));
    let y_thread = std::thread::spawn(|| Arc::into_inner(y));
    let x_inner_value = x_thread.join().unwrap();
    let y_inner_value = y_thread.join().unwrap();
    // Один из потоков гарантированно получит внутреннее значение:
    assert!(matches!(
        (x_inner_value, y_inner_value),
        (None, Some(3)) | (Some(3), None)
    ));
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    #![feature(arc_unwrap_or_clone)]
    let inner = String::from("test");
    let ptr = inner.as_ptr();

    let arc = Arc::new(inner);
    let inner = Arc::unwrap_or_clone(arc);
    // The inner value was not cloned
    assert!(ptr::eq(ptr, inner.as_ptr()));

    let arc = Arc::new(inner);
    let arc2 = arc.clone();
    let inner = Arc::unwrap_or_clone(arc);
    // Because there were 2 references, we had to clone the inner value.
    assert!(!ptr::eq(ptr, inner.as_ptr()));
    // `arc2` is the last reference, so when we unwrap it we get back
    // the original `String`.
    let inner = Arc::unwrap_or_clone(arc2);
    assert!(ptr::eq(ptr, inner.as_ptr()));
}
</code></pre>
