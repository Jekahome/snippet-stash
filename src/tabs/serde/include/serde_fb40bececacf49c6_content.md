


<pre><code class="language-rust">
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Debug)]
struct MyStruct {
    name: String,
    age: Option<u32>,
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let person_with_age = MyStruct {
        name: "Alice".to_string(),
        age: Some(30),
    };

    let person_without_age = MyStruct {
        name: "Bob".to_string(),
        age: None,
    };

    // Сериализация
    let serialized_with_age = serde_json::to_string(&person_with_age)?;
    let serialized_without_age = serde_json::to_string(&person_without_age)?;

    println!("Serialized with age: {}", serialized_with_age);
    println!("Serialized without age: {}", serialized_without_age);

    // Десериализация
    let deserialized_with_age: MyStruct = serde_json::from_str(&serialized_with_age)?;
    let deserialized_without_age: MyStruct = serde_json::from_str(&serialized_without_age)?;

    println!("Deserialized with age: {:?}", deserialized_with_age);
    println!("Deserialized without age: {:?}", deserialized_without_age);

    Ok(())
}
</code></pre>
