

Предложение Where для реализаций Serialize и Deserialize. Это заменяет любые границы, выведенные Serde
* `#[serde(bound = "T: MyTrait")]`
* `#[serde(bound(serialize = "T: MySerTrait", deserialize = "T: MyDeTrait"))]`
* `#[serde(bound(deserialize = "S: FromStr, S::Err: Display"))]` 
* `#[serde(bound(deserialize = "Ptr<'a, T>: Deserialize<'de>"))]`



<pre><code class="language-rust">
#[macro_use]
extern crate serde_derive;
extern crate serde;
extern crate serde_json;
use serde::de::{self, Deserialize, Deserializer};
use std::fmt::Display;
use std::str::FromStr;
#[derive(Deserialize, Debug)]
struct Outer<'a,  T: 'a + ?Sized> {
// Здесь Serde хотел бы создать привязку `T: Deserialize`. Это более строгое условие
//, чем это необходимо. Фактически, функция `main` ниже
// использует T = str, которая не реализует Deserialize. Мы переопределяем
// автоматически сгенерированную привязку (bound) более свободно.
    #[serde(bound(deserialize = "Ptr<'a, T>: Deserialize<'de>"))]
    ptr: Ptr<'a, T>,

}
/// Указатель на `T`, который может или не может владеть данными. При десериализации мы
/// всегда хотим создавать собственные данные.
#[derive(Debug)]
enum Ptr<'a, T: 'a + ?Sized> {
    Ref(&'a T),
    Owned(Box<T>),
}
impl<'de, 'a, T: 'a + ?Sized> Deserialize<'de> for Ptr<'a, T>
 where Box<T>: Deserialize<'de>,
{
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error> where D: Deserializer<'de>,
    {
        Deserialize::deserialize(deserializer).map(Ptr::Owned)
    }
}
fn main() {
    let j = r#"
        {
          "ptr": "owned value"
        }
    "#;
    let result: Outer<str> = serde_json::from_str(j).unwrap();
    println!("result = {:?}", result);  // result = Outer { ptr: Owned("owned value") }
}
</code></pre>
