


<pre><code class="language-rust">
use serde::{Serialize, Deserialize};

type StaticStr = &'static str;
#[derive(Debug, PartialEq, Eq, Serialize, Deserialize)]
#[serde(try_from = "RawFoo")]
struct FooWithStatic {
    name: StaticStr,
}

#[derive(Debug, PartialEq, Eq, Serialize, Deserialize)]
struct RawFoo {
    name: String,
}

struct FooNotFound;

impl std::fmt::Display for FooNotFound {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "Foo not found!")
    }
}
impl TryFrom<RawFoo> for FooWithStatic {
    type Error = FooNotFound;
    
    fn try_from(raw_foo: RawFoo) -> Result<Self, Self::Error> {
        match raw_foo.name.as_str() {
            "foo" => Ok(FooWithStatic { name: &"foo" }),
            "bar" => Ok(FooWithStatic { name: &"bar" }),
            "baz" => Ok(FooWithStatic { name: &"baz" }),
            _ => Err(FooNotFound)
        }
    }
}
fn main() {
    let foo = FooWithStatic { name: "foo" };
    let serialized = serde_json::to_value(&foo).unwrap();
    let deserialized: FooWithStatic = serde_json::from_value(serialized).unwrap();
    assert_eq!(foo, deserialized);
}
//    Compiling playground v0.0.1 (/playground)
// error: implementation of `Deserialize` is not general enough
//   --> src/main.rs:38:39
//    |
// 38 |     let deserialized: FooWithStatic = serde_json::from_value(serialized).unwrap();
//    |                                       ^^^^^^^^^^^^^^^^^^^^^^ implementation of `Deserialize` is not general enough
//    |
//    = note: `FooWithStatic` must implement `Deserialize<'0>`, for any lifetime `'0`...
//    = note: ...but it actually implements `Deserialize<'static>`
// error: could not compile `playground` due to previous error

</code></pre>
