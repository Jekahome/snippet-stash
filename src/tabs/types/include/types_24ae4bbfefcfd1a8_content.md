

Обратной стороной использования шаблона newtype является необходимость написания большего количества шаблонного кода, поскольку вам придется самостоятельно обеспечивать реализацию общих свойств (например `Clone, Copy, From/Into, AsRef​​/AsMut`), поскольку без них тип не будет эргономичным в использовании. 

Однако большинство из них могут быть получены автоматически с помощью `std` возможностей или сторонних крейтов (например, `derive_more`), поэтому стоимость в большинстве случаев приемлема. Более того, превосходный nutype ящик развивает эту идею еще дальше, стремясь обеспечить лучшую эргономику для модели newtype без ущерба для каких-либо гарантий, которые она дает.
<pre><code class="language-rust">
extern crate derive_more;
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
    #[display(fmt = "int: {}", _0)]
    Int(i32),
    Uint(u32),
    #[display(fmt = "nothing")]
    Nothing,
}
fn main(){
    assert!(MyInt(11) == MyInt(5) + 6.into());
    assert!((5, 6) == Point2D { x: 5, y: 6 }.into());
    assert!(MyEnum::Int(15) == (MyEnum::Int(8) + 7.into()).unwrap());
    assert!(MyEnum::Int(15).to_string() == "int: 15");
    assert!(MyEnum::Uint(42).to_string() == "42");
    assert!(MyEnum::Nothing.to_string() == "nothing");
}
</code></pre>
