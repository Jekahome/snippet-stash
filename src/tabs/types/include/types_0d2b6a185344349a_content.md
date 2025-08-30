

Если преобразовывать через `from/into` из типа большего диапазона в тип с меньшим диапазоном, то компилятор гарантирует, что преобразование будет работать без потери данных или переполнения.
<pre><code class="language-rust">
fn main(){
    let x:u32 = u32::from(10u8); // безопасно
}
</code></pre>

Если бы вы попытались сделать обратное преобразование (из u32 в u8), компилятор бы выдал ошибку, так как это не всегда безопасно, и потребовал бы явного приведения типа (`as`). Так как `as` может **обрезать (truncating)** биты и приводить к неожиданным результатам.
<pre><code class="language-rust">
fn main(){
     // let x:u8 = u8::from(10u32); ❌ ERROR
     let x:u8 = 10u32 as u8; // ✅ OK
}
</code></pre>

---

<pre><code class="language-rust">
use std::convert::From;
#[derive(Debug)]
struct Number {
    value: i64
}
impl From<i64> for Number {
    fn from(item: i64) -> Self {
        Number { value: item }
    }
}
fn main() {
    let num = Number::from(30);
    //let num = Number{value:30};
    println!("My number is {:?}", num);

    let int = 5;
    let num: Number = int.into();
    println!("My number is {:?}", num);
}
</code></pre>

