


<pre><code class="language-rust">
trait ConvertTo<Output> {
    fn convert(&self) -> Output;
}
impl ConvertTo<i64> for i32 {
    fn convert(&self) -> i64 { *self as i64 }
}
fn inverse<T>() -> T where i32: ConvertTo<T> { // использует ConvertTo как если бы это было «ConvertTo<i64>»
    1i32.convert()
}
fn main(){
    assert_eq!(1i64,inverse::<i64>());
}
</code></pre>
