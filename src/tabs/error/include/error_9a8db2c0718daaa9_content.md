


<pre><code class="language-rust">
fn main(){
    let x: Result<u32, &str> = Ok(7);
    assert_eq!(x.iter().next(), Some(&7));

    let x: Result<u32, &str> = Err("nothing!");
    assert_eq!(x.iter().next(), None);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut x: Result<u32, &str> = Ok(7);
    match x.iter_mut().next() {
        Some(v) => *v = 40,
        None => {},
    }
    assert_eq!(x, Ok(40));

    let mut x: Result<u32, &str> = Err("nothing!");
    assert_eq!(x.iter_mut().next(), None);
}
</code></pre>
