

Гибко и меньше бинарный файл, но выполнение медленнее чем мономорфный код
<pre><code class="language-rust">
use std::any::{Any, TypeId};
fn log(value: &dyn Any) {
    match value.downcast_ref::<String>() {
        Some(text) => println!("Bytes of the string: {:?}", text.as_bytes()),
        None => println!("No string...")
    };
}
fn main() {
    // &T is coerced into &dyn Any:
    log(&String::from("hello"));
    log(&10);
}
</code></pre>

---

Трейт `Any` реализуется автоматически для всех типов, которые не содержат нестатических ссылок.
<pre><code class="language-rust">
struct Abc(u8);
fn main() {
    use std::any::{Any, TypeId};
    let val: Abc = Abc(10u8);
    println!("Type ID of u8: {:?}", val.type_id());
    assert_eq!(val.type_id(), TypeId::of::<Abc>());
}
</code></pre>
