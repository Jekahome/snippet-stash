


<pre><code class="language-rust">
use serde::de::{self, Deserialize, Deserializer, Visitor, SeqAccess};
use serde::Serialize;
use std::fmt;

#[derive(Serialize, Debug)]
struct Person {
    name: String,
    age: u8,
}

impl<'de> Deserialize<'de> for Person {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error> where D: Deserializer<'de> {
        struct PersonVisitor;

        impl<'de> Visitor<'de> for PersonVisitor {
            type Value = Person;

            fn expecting(&self, formatter: &mut fmt::Formatter) -> fmt::Result {
                formatter.write_str("a struct representing a Person")
            }
            fn visit_seq<V>(self, mut seq: V) -> Result<Self::Value, V::Error> where V: SeqAccess<'de> {
                let name: String = seq
                    .next_element()?
                    .ok_or_else(|| de::Error::invalid_length(0, &self))?;
                let age: u8 = seq
                    .next_element()?
                    .ok_or_else(|| de::Error::invalid_length(1, &self))?;
                Ok(Person { name, age })
            }
        }
        // метод deserialize_map не поддерживается форматом Bincode так как в данных отсутвуют ключи, 
        // есть только последовательность данных
        deserializer.deserialize_struct("Person", &["name", "age"], PersonVisitor)
    }
}
fn main() -> Result<(), Box<dyn std::error::Error>> {
    let person = Person {
        name: "Alice".to_string(),
        age: 30,
    };
    // Сериализация в формат Bincode
    let serialized: Vec<u8> = bincode::serialize(&person)?;// [5, 0, 0, 0, 0, 0, 0, 0, 65, 108, 105, 99, 101, 30]
    println!("Serialized data: {:?}", serialized);
    // Десериализация из формата Bincode
    let deserialized: Person = bincode::deserialize(&serialized)?;
    println!("Deserialized struct: {:?}", deserialized);
    Ok(())
}
</code></pre>
