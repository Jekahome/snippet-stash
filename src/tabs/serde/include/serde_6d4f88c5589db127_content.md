


<pre><code class="language-rust">
use serde::{Serialize, Deserialize, Serializer, Deserializer};
use serde::ser::{SerializeStruct, SerializeTupleStruct};
use serde::de::{self, Visitor};
use std::fmt;

#[derive(Debug)]
struct MyStruct {
    name: String,
    age: Option<u32>,
}
impl Serialize for MyStruct {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let mut state = serializer.serialize_struct("MyStruct", 2)?;
        state.serialize_field("name", &self.name)?;
        // Кастомная сериализация Option
        match &self.age {
            Some(age) => state.serialize_field("age", age)?,
            None => state.serialize_field("age", "")?, // Сериализуем None как пустую строку
        }
        state.end()
    }
}
impl<'de> Deserialize<'de> for MyStruct {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,{
        struct MyStructVisitor;

        impl<'de> Visitor<'de> for MyStructVisitor {
            type Value = MyStruct;

            fn expecting(&self, formatter: &mut fmt::Formatter) -> fmt::Result {
                formatter.write_str("a struct representing a person")
            }

            fn visit_map<V>(self, mut map: V) -> Result<Self::Value, V::Error>
            where
                V: de::MapAccess<'de>,
            {
                let mut name = None;
                let mut age = None;

                while let Some(key) = map.next_key()? {
                    match key {
                        "name" => {
                            if name.is_some() {
                                return Err(de::Error::duplicate_field("name"));
                            }
                            name = Some(map.next_value()?);
                        }
                        "age" => {
                            // Кастомная десериализация: если age пустая строка, интерпретируем как None
                            let val: String = map.next_value()?;
                            age = if val.is_empty() {
                                None
                            } else {
                                Some(val.parse().unwrap()) // Преобразуем строку в число
                            };
                        }
                        _ => {
                            let _: serde::de::IgnoredAny = map.next_value()?;
                        }
                    }
                }

                let name = name.ok_or_else(|| de::Error::missing_field("name"))?;
                Ok(MyStruct { name, age })
            }
        }
        deserializer.deserialize_struct("MyStruct", &["name", "age"], MyStructVisitor)
    }
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
    let serialized_with_age = serde_json::to_string(&person_with_age)?;
    let serialized_without_age = serde_json::to_string(&person_without_age)?;
    println!("Serialized with age: {}", serialized_with_age);
    println!("Serialized without age: {}", serialized_without_age);

    let deserialized_with_age: MyStruct = serde_json::from_str(&serialized_with_age)?;
    let deserialized_without_age: MyStruct = serde_json::from_str(&serialized_without_age)?;
    println!("Deserialized with age: {:?}", deserialized_with_age);
    println!("Deserialized without age: {:?}", deserialized_without_age);
    Ok(())
}
</code></pre>
