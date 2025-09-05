

Для разложения общих ключей в общую структуру

`#[serde(flatten)]`


<pre><code class="language-rust">
use std::collections::HashMap; 
#[derive(Serialize,Deserialize, Debug)]
struct People{
    id: String,

    #[serde(flatten)]
    extra: HashMap<String, serde_json::Value>,
}

fn main() -> serde_json::Result<()> {
    let mut map:HashMap<String, serde_json::Value> = HashMap::new();
    map.insert("mascot".to_owned(),"Ferris".into());

    let p = People{id:"123".into(),extra:map};
    let p_string = serde_json::to_string(&p).unwrap();// Serialize
    println!("serialized = {}", &p_string);// {"id":"123","mascot":"Ferris"}

    let p: People = serde_json::from_str(&p_string)?;// Deserialize
    println!("deserialized = {:?}", p);// People { id: "123", extra: {"mascot": String("Ferris")} }
}
</code></pre>
