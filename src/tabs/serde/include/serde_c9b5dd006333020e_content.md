

Десериализуйте это поле по заданному имени или по имени текущему имени поля

`#[serde(alias = "name")]`



<pre><code class="language-rust">
#[derive(Serialize,Deserialize)]
struct People{
    #[serde(alias = "Some_Thing", alias = "something")]
    some_thing:i32
}
fn main() -> serde_json::Result<()> {
    let p_string = r#"{"some_thing": 3}"#;
    let p_string = r#"{"something": 3}"#;
    let p_string = r#"{"Some_Thing": 3}"#;
    let p: People = serde_json::from_str(&p_string)?;// Deserialize
    println!("deserialized = {:?}", p);
}
</code></pre>
