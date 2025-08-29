

В Rust есть множество встроенных свойств, реализованных для его основных типов, таких как «Add», «Not», «From» или «Display».
 
Однако при обертывании этих типов внутри ваших собственных структур или перечислений вы теряете реализации этих свойств и должны создавать их заново. 

Это особенно раздражает, когда ваши собственные структуры очень просты, например, при использовании часто рекомендуемого шаблона newtype (например, MyInt(i32)).
<pre><code class="language-rust">
// [dependencies]
// derive_more = "1.0.0"

use derive_more::{Add, Display, From, Into};

#[derive(PartialEq, From, Add)]
struct MyInt(i32);

#[derive(PartialEq, From, Into)]
struct Point2D {
    x: i32,
    y: i32,
}

#[derive(PartialEq, From, Add, Display)]
enum MyEnum {
    #[display("int: {_0}")]
    Int(i32),
    Uint(u32),
    #[display("nothing")]
    Nothing,
}

fn main() {
    assert!(MyInt(11) == MyInt(5) + 6.into());
}
</code></pre>
