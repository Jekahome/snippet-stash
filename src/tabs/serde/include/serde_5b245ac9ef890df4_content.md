

Десериализуйте этот тип, десериализовав его в FromType, а затем преобразовав. Этот тип должен реализовывать `From<FromType>`, а FromType должен реализовывать десериализацию

`#[serde(from = "FromType")]`

`#[serde(try_from = "FromType")]`

`#[serde(into = "IntoType")]`

 
<pre><code class="language-rust">
#[derive(Serialize,Deserialize, Debug)]
struct Something(i32);
 
#[derive(Serialize,Deserialize, Debug)]
#[serde(from = "Something")]
struct Something2(i32);

impl std::convert::From<Something> for Something2 {
    fn from(item: Something) -> Self {
        Something2(item.0+5)
    }
}
fn main() -> serde_json::Result<()> {
   let s_string = r#"7"#;
   let s: Something2 = serde_json::from_str(&s_string)?;// Deserialize 
   println!("deserialized = {:?}", s); // Something2(12)
   let s_string = serde_json::to_string(&s).unwrap();// Serialize 
   assert_eq!("12", s_string);
}
</code></pre>
