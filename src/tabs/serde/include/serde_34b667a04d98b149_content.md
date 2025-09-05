

Если значение отсутствует при десериализации подставится Default

`#[serde(default)]`

`#[serde(default = "path")]`



<pre><code class="language-rust">
#[derive(Serialize,Deserialize)]
struct People{
    #[serde(default)]
    some_thing:i32
}
fn main() -> serde_json::Result<()> {
    let p_string = r#"{}"#;
    let p: People = serde_json::from_str(&p_string)?;// Deserialize
   // People { some_thing: 0 }
}
</code></pre>
