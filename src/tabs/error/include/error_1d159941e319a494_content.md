


<pre><code class="language-rust">
fn main(){
    let x: Option<u32> = Some(2);
    assert_eq!(x.is_some(), true);

    let x: Option<u32> = None;
    assert_eq!(x.is_none(), true);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let x: Option<u32> = Some(2);
    assert_eq!(x.is_some_and(|x| x > 1), true);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let x = Some(2);
    let y = Some("foo");
    assert_eq!(x.and(y), Some("foo"));
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let x = None;
    let y = Some(100);
    assert_eq!(x.or(y), Some(100));
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    fn vikings() -> Option<&'static str> { Some("vikings") }
    assert_eq!(None.or_else(vikings), Some("vikings"));
}
</code></pre>
