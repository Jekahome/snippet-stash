


<pre><code class="language-rust">
fn main(){
    let x: Result<i32, &str> = Ok(-3);
    assert_eq!(x.is_ok(), true);

    let x: Result<i32, &str> = Err("Some error message");
    assert_eq!(x.is_err(), true);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let x: Result<u32, &str> = Ok(2);
    let y: Result<&str, &str> = Err("late error");
    assert_eq!(x.and(y), Err("late error"));

    let x: Result<u32, &str> = Err("early error");
    let y: Result<&str, &str> = Ok("foo");
    assert_eq!(x.and(y), Err("early error"));
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let x: Result<u32, &str> = Ok(2);
    let y: Result<u32, &str> = Err("late error");
    assert_eq!(x.or(y), Ok(2));

    let x: Result<u32, &str> = Err("early error");
    let y: Result<u32, &str> = Ok(2);
    assert_eq!(x.or(y), Ok(2));
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    fn sq(x: u32) -> Result<u32, u32> { Ok(x * x) }
    fn err(x: u32) -> Result<u32, u32> { Err(x) }

    assert_eq!(Ok(2).or_else(sq).or_else(sq), Ok(2));
    assert_eq!(Ok(2).or_else(err).or_else(sq), Ok(2));
    assert_eq!(Err(3).or_else(sq).or_else(err), Ok(9));
    assert_eq!(Err(3).or_else(err).or_else(err), Err(3));
}
</code></pre>

