

Это используется при получении Serialize для remote type, который имеет одно или несколько частных полей

`#[serde(getter = "...")]`



<pre><code class="language-rust">
use serde::{Deserialize, Serialize};
trait Fake{
    fn get_value(&self) -> Vec<u8>;
}
impl Fake for String{
    fn get_value(&self) -> Vec<u8>{
        vec![0u8;1]
        //unimplemented!()
    }
}

#[serde(remote = "std::string::String")]
#[derive(Serialize,Deserialize,Debug)]
pub struct MockString {
    #[serde(getter = "String::get_value")]
    vec: Vec<u8>
}
impl std::convert::From<MockString> for String {
    fn from(item: MockString) -> String {
        String::from_utf8(item.vec).unwrap_or_default()  
    }
}
fn main() -> serde_json::Result<()>{
    let mock_string:&str = r#"{"vec":[104, 101, 108, 108, 111]}"#;
    let mut de = serde_json::Deserializer::from_str(mock_string);
    let string:String = MockString::deserialize(&mut de)?;
    println!("deserialized = {:?}",string);// hello
    Ok(())
}
</code></pre>
