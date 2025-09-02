

<pre><code class="language-rust">
fn main(){
     let x = Some(4);
    assert_eq!(x.iter().next(), Some(&4));
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut x = Some(4);
    match x.iter_mut().next() {
        Some(v) => *v = 42,
         None => {},
    }
    assert_eq!(x, Some(42));
}
</code></pre>
