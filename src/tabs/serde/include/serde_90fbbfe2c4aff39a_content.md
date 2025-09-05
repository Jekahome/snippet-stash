

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
struct Outer<T> {
// При получении Deserialize impl, Serde захочет создать связанный
// `T: Deserialize` в типе этого поля. Но мы собираемся использовать `FromStr` вместо `Deserialize`, используя
// `deserialize_from_str`, поэтому мы переопределяем автоматически созданный bound
// тем, который требуется для` deserialize_from_str`,
    #[serde(deserialize_with = "deserialize_from_str")]
    #[serde(bound(deserialize = "T: FromStr, T::Err: Display"))]
    s: T,
}
fn deserialize_from_str<'de, T, D>(deserializer: D) -> Result<T, D::Error>
    where
        T: FromStr,
        T::Err: Display,
        D: Deserializer<'de>,
{
    let s: String = Deserialize::deserialize(deserializer)?;
    T::from_str(&s).map_err(de::Error::custom)
}
fn main() {
    let j = r#"
        {
          "s": "1234567890"
        }
    "#;
    let result: Outer<u64> = serde_json::from_str(j).unwrap();
    // result = Outer { s: 1234567890 }
    println!("result = {:?}", result);
}
</code></pre>

---
 
<pre><code class="language-rust">
#[derive(Deserialize, Debug)]
struct  Outer {
    s:u64,
    ptr:Ptr
}
enum Ptr<'a, T: 'a + ?Sized> {
    Ref(&'a T),
    Owned(Box<T>),
}

fn main() {
    let j = r#"
        {
          "s": "1234567890",
          "ptr": "owned"
        }
    "#;
    let result: Outer<u64, str> = serde_json::from_str(j).unwrap();
   // let result: Outer  = serde_json::from_str(j).unwrap();

    // result = Outer { s: 1234567890, ptr: Owned("owned") }
    println!("result = {:?}", result);
}
// panic "s": "1234567890" не может преобразоваться в s:u64
// И ptr это enum Ptr который надо создать из строки "owned"
</code></pre>
