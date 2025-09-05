


<pre><code class="language-rust">
#[derive(Debug)]
struct Item(u64);

impl Item {
    fn new(n:u64) -> Option<Item> {
        if n < 10 {
           return None;
        }
        Some(Item(n))
    }
}

impl<'de> Deserialize<'de> for Item {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error> where D: Deserializer<'de> {
        Deserialize::deserialize(deserializer)
        .map(|v:serde_json::Value|{
           //v.as_str().unwrap_or_default().to_string()
            v.as_str().map(|s:&str|{s.to_string()})//.unwrap_or_default()
        })
       .and_then(|res|{
           res.ok_or(serde::de::Error::custom("Value error as_str"))
       })
        .and_then(|s:String|{
             s.parse::<u64>()
                 .map_err(|_e|serde::de::Error::custom("Can't parse u64 "))
        })
        .and_then(|n:u64|{
            Item::new(n).ok_or(serde::de::Error::custom("n < 10"))
        })
    }
}
fn main(){
    let deserialized:Item  = serde_json::from_str("\"11\"").unwrap();
    println!("{:?}",deserialized); 
}
</code></pre>


Не учитывая валидацию типа
<pre><code class="language-rust">
use std::fmt::Display;
use std::str::FromStr;
#[derive(Deserialize,Debug)]
struct Item(#[serde(deserialize_with = "from_str")] u64);
fn from_str<'de, T, D>(deserializer: D) -> Result<T, D::Error>
    where T: FromStr,
          T::Err: Display,
          D: Deserializer<'de>
{
    let s = String::deserialize(deserializer)?;
    T::from_str(&s).map_err(de::Error::custom)
}
</code></pre>
