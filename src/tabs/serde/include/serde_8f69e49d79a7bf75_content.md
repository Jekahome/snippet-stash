

Это используется для получения Serialize и Deserialize для remote types

`#[serde(remote = "...")]`

Есть remote types bar::Bar у которого нет реализации Serialize/Deserialize
тогда мы можем ее получить через подставной тип MockBar с помошью ссылки `#[serde(remote = "Bar")]`
<pre><code class="language-rust">
pub use bar::Bar;
mod bar{
    #[derive(Debug)] 
    pub struct Bar {
        pub value:i32
    }   
} 

#[serde(remote = "Bar")]
#[derive(Serialize,Deserialize,Default,Debug)]
pub struct MockBar{
    value:i32
}

#[derive(Serialize,Deserialize,Debug)]
struct Process {
    #[serde(with = "MockBar")] // использовать Serialize/Deserialize от MockBar
    something: Bar,
}

fn main() -> serde_json::Result<()> {
// Получить Serialize/Deserialize для Bar
    let f_string = r#"{"value":4}"#;
    let mut de = serde_json::Deserializer::from_str(f_string);
    let bar:Bar = MockBar::deserialize(&mut de)?;
    println!("deserialized = {:?}",bar); // Bar { value: 4 }
//--------------------------------------------------------------------
// Теперь для вложенных данных Bar
    let p_string = r#"{"something":{"value":4}}"#;
    let p: Process = serde_json::from_str(&p_string)?;
    println!("deserialized = {:?}",p);// Process { something: Bar { value: 4 } }
     
    let p_string = serde_json::to_string(&p).unwrap();
    println!("serialized = {}", &p_string);// {"something":{"value":4}}
}
</code></pre>
