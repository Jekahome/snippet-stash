

Пропустите это поле: не сериализуйте и не десериализуйте его.
При десериализации Serde будет использовать Default::default()

`#[serde(skip)]`



<pre><code class="language-rust">
#[derive(Default,Debug)]
struct Something(i32);
 
use std::collections::HashMap; 
#[derive(Serialize,Deserialize,Debug)]
struct People{
    id: i32,
    
    #[serde(skip)]
    something:Something 
}
fn main() -> serde_json::Result<()> {
    let person_str = r#"{"id":23}"#;
    let p: People = serde_json::from_str(&person_str)?;// Deserialize
    println!("deserialized = {:?}", p);// People { id: 23, something: Something(0) }
}
</code></pre>
