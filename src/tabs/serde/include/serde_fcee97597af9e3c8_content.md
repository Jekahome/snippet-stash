

При десериализации все недостающие поля должны быть заполнены из заданной ф-ции. Разрешено только в структурах.

`#[serde(default = "path")]`



<pre><code class="language-rust">
#[derive(Serialize,Deserialize, Debug)]
#[serde(default = "some_default")]
struct MyStruct{
    value:i32
}
fn some_default()->MyStruct{
    MyStruct{value:8}
}
fn main() -> serde_json::Result<()> {
   let st_string = r#"{}"#;
   let st: MyStruct = serde_json::from_str(&st_string)?;// Deserialize
   println!("deserialized = {:?}", st);// MyStruct { value: 8 }
}
</code></pre>
