

<pre><code class="language-rust">
fn main(){
    let mut x = Some(2);
    let val = x.take();
    assert_eq!(x, None);

    аналог
    let val = std::mem::replace(&mut composers[0].name, None);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut x = None;
    {
            let y: &mut u32 = x.get_or_insert(5);
            assert_eq!(y, &5);

            *y = 7;
    }
    assert_eq!(x, Some(7));
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut x = None;
    {
            let y: &mut u32 = x.get_or_insert_with(|| 5);
            assert_eq!(y, &5);

            *y = 7;
    }
    assert_eq!(x, Some(7));
}
</code></pre>

---
 
<pre><code class="language-rust">
fn main(){
    let mut x = Some(2);
    let old = x.replace(5);
    assert_eq!(x, Some(5));
    assert_eq!(old, Some(2));
}
</code></pre>

---
 
<pre><code class="language-rust">
fn main(){
    let mut opt = None;
    let val:&mut i32 = opt.insert(1);
    assert_eq!(*val, 1);
    assert!(opt.is_some());
    assert_eq!(opt.unwrap(), 1);
}
</code></pre>
