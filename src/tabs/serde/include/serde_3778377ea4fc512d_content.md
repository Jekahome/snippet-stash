

Заимствуйте данные

`#[serde(borrow)]`

`#[serde(borrow = "'a + 'b + ...")]`



<pre><code class="language-rust">
#[derive(Debug,Serialize, Deserialize,Default)]
pub struct Config<'a> {
    pub name: std::borrow::Cow<'a,str>,
}

#[derive(Debug,Serialize, Deserialize)]
struct SourceConfig<'a>  {
    #[serde(borrow)]
    config: Config<'a>,
    id: u32,
}

fn main() -> serde_json::Result<()> {
    let j = r#"{"id": 123,"config": {"name": "John Smith" }}"#;
    let src: SourceConfig = serde_json::from_str(&j).unwrap();// Deserialize 
    let src_string = serde_json::to_string(&src).unwrap();// Serialize
    let src: SourceConfig = serde_json::from_str(&src_string)?;// Deserialize 

    let sc: Config = Config::default();
    let p_string = serde_json::to_string(&sc).unwrap();// Serialize
    let p: Config = serde_json::from_str(&p_string)?;// Deserialize       
}
</code></pre>
