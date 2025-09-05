

Пропустите сериализацию этого поля если условие не выполняется

`#[serde(skip_serializing_if = "path")]`



<pre><code class="language-rust">
#[derive(Serialize,Deserialize, Debug)]
struct People{
    id: i32,

    #[serde(skip_serializing_if = "Something::if_ser")]
    something:Something 
}

fn main() -> serde_json::Result<()> {
    let p = People{id:123,something:Something(255)};
    let p_string = serde_json::to_string(&p).unwrap();// Serialize
    println!("serialized = {}", &p_string);// {"id":123}

   // На Deserialize это не влияет
    let p_string = r#"{"id":23,"something":255}"#;
    let p: People = serde_json::from_str(&p_string)?;// Deserialize
    println!("deserialized = {:?}", p);// People { id: 23, something: Something(255) }
}
</code></pre>
