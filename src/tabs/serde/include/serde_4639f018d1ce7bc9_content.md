

```toml
[dependencies]
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
```

<pre><code class="language-rust">
use serde::{Deserialize, Serialize};
use serde_json::Result;

#[derive(Serialize, Deserialize, Debug)]
struct Person {
    name: String,
    age: u8,
    phones: Vec<String>,
}

fn main() -> Result<()> {
    let person = Person { name: "John Doe".to_string(), age: 2_u8, phones:vec![]};
    let person_str = r#"
        {
            "name": "John Doe",
            "age": 43,
            "phones": [
                "+44 1234567",
                "+44 2345678"
            ]
        }"#;

    let person: Person  = serde_json::from_str(&person_str).unwrap();// Deserialize
    println!("deserialized = {:?}", person);// Person { name: "John Doe", age: 43, phones: ["+44 1234567", "+44 2345678"] }
    let person_str:String = serde_json::to_string(&person).unwrap();// Serialize

// From To File
    println!("serialized = {}", &person_str);// {"name":"John Doe","age":43,"phones":["+44 1234567","+44 2345678"]}
    std::fs::write("person.txt", person_str);
    let person_str:String = std::fs::read_to_string("person.txt").unwrap(); 

    Ok(())
}
</code></pre>
