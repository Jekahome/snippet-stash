

<pre><code class="language-rust">
fn main(){
    fn sq(x: u32) -> Result<u32, u32> { Ok(x * x) }
    assert_eq!(Ok(2).and_then(sq).and_then(sq), Ok(16));
}
</code></pre>

---

<pre><code class="language-rust">
fn multiply(x: &str, y: &str) -> Result<i32, ParseIntError> {
    //  или Result.Ok<T> или Result.Err<E>
    match x.parse::<i32>() {
        Ok( first )  => {
            match y.parse::<i32>() {
                Ok( second )  => {
                    Ok(first  * second )
                },
                Err(e) => Err(e),
            }
        },
        Err(e) => Err(e),
    }
}
// или более понятный синтаксис с and_then()
fn multiply(x: &str, y: &str) -> Result<i32, ParseIntError> {
    // Если вернулся Result.Ok выполняется вложенное действие
    x.parse::<i32>().and_then(|first | {
        y.parse::<i32>().map(|second | first  * second )
    })
}
</code></pre>

