


<pre><code class="language-rust">
fn main(){
    let x: Result<u32, &str> = Ok(2);
    assert_eq!(x.ok(), Some(2));

    let x: Result<u32, &str> = Err("Nothing here");
    assert_eq!(x.ok(), None);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let x: Result<u32, &str> = Ok(2); 
    assert_eq!(x.err(), None);

    let x: Result<u32, &str> = Err("Nothing here");
    assert_eq!(x.err(), Some("Nothing here"));
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    // Транспонирует в Result из  Option
    #[derive(Debug, Eq, PartialEq)]
    struct SomeErr;

    let x: Result<Option<i32>, SomeErr> = Ok(Some(5));
    let y: Option<Result<i32, SomeErr>> = Some(Ok(5));
    assert_eq!(x.transpose(), y);
}
</code></pre>
