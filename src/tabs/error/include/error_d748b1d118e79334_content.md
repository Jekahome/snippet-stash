

<pre><code class="language-rust">
fn main(){
    UserNum::new(num).ok_or(serde::de::Error::custom(format!(
                "`num` must be in range {} {}",
                 MIN_NUM, MAX_NUM
    )))
    UserNum::new(num).ok_or_else(|| serde::de::Error::custom(format!(
                "`num` must be in range {} {}",
                MIN_NUM, MAX_NUM
    )))
}
</code></pre>

---

<pre><code class="language-rust">
#[derive(Debug, Eq, PartialEq)]
struct SomeErr;
fn main(){
    let x: Result<Option<i32>, SomeErr> = Ok(Some(5));
    let y: Option<Result<i32, SomeErr>> = Some(Ok(5));
    assert_eq!(x, y.transpose());
}
</code></pre>
