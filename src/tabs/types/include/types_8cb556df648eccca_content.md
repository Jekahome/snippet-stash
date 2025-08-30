

Для случаев, когда возможна ошибка.

Если `x` вне диапазона `u8`, будет `Err`.
<pre><code class="language-rust">
use std::convert::TryFrom;
fn main(){
   let x: i32 = 150;
   let y = u8::try_from(x); // Result<u8, TryFromIntError>
}
</code></pre>
