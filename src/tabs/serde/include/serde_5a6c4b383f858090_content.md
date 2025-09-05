


<pre><code class="language-rust">
extern crate serde;
#[macro_use]
extern crate serde_derive;
extern crate serde_json;

use serde::de::{Deserialize, Deserializer, Error, Unexpected};

#[derive(Debug, Deserialize)]
struct Payload {
    #[serde(default)]
    values: Vec<Vec<Value>>,
}

#[derive(Debug)]
struct Value(f64);

impl<'de> Deserialize<'de> for Value {
    fn deserialize<D>(deserializer: D) -> Result<Value, D::Error>
        where D: Deserializer<'de>
    {
        let s: &str = Deserialize::deserialize(deserializer)?;
        s.parse()
            .map(Value)
            .map_err(|_| D::Error::invalid_value(Unexpected::Str(s), &"a floating point number as a string"))
    }
}
fn main() {
    let input = r#"
{
  "values": [["2", "1.4"], ["8.32", "1.5"]]
}
"#;
</code></pre>
