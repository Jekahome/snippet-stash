

Если поле age в JSON может быть как числом, так и строкой, содержащей число, вам нужно учесть оба возможных формата при десериализации. 
Для этого можно использовать метод map.next_value с оберткой над обработчиком значений.

<pre><code class="language-rust">
use serde::de::{self, Deserializer, Visitor, MapAccess};
use std::fmt;

// Ваша структура
#[derive(Debug)]
struct Person {
    name: String,
    age: u32,
}
// Реализация Deserialize для Person
impl<'de> serde::Deserialize<'de> for Person {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error> where D: Deserializer<'de> {
        deserializer.deserialize_any(PersonVisitor)
    }
}

// Посетитель для десериализации структуры Person
struct PersonVisitor;

impl<'de> Visitor<'de> for PersonVisitor {
    type Value = Person;

    fn expecting(&self, formatter: &mut fmt::Formatter) -> fmt::Result {
        formatter.write_str("a map representing a Person")
    }
    fn visit_map<M>(self, mut map: M) -> Result<Self::Value, M::Error> where M: MapAccess<'de> {
        let mut name = None;
        let mut age = None;

        while let Some(key) = map.next_key::<String>()? {
            match key.as_str() {
                "name" => {
                    name = Some(map.next_value()?);
                }
                "age" => {
                    age = Some(map.next_value::<FlexibleU32>()?.0);
                }
                _ => {
                    // Пропускаем неизвестные ключи
                    let _ = map.next_value::<de::IgnoredAny>()?;
                }
            }
        }
        // Убедимся, что все обязательные поля есть
        let name = name.ok_or_else(|| de::Error::missing_field("name"))?;
        let age = age.ok_or_else(|| de::Error::missing_field("age"))?;
        Ok(Person { name, age })
    }
}

// Обертка для десериализации age как числа или строки
struct FlexibleU32(u32);

impl<'de> serde::Deserialize<'de> for FlexibleU32 {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        struct FlexibleU32Visitor;

        impl<'de> Visitor<'de> for FlexibleU32Visitor {
            type Value = FlexibleU32;

            fn expecting(&self, formatter: &mut fmt::Formatter) -> fmt::Result {
                formatter.write_str("an integer or a string containing an integer")
            }

            fn visit_u64<E>(self, value: u64) -> Result<Self::Value, E> where E: de::Error {
                Ok(FlexibleU32(value as u32))
            }

            fn visit_str<E>(self, value: &str) -> Result<Self::Value, E> where E: de::Error {
                value
                    .parse::<u32>()
                    .map(FlexibleU32)
                    .map_err(|_| de::Error::invalid_value(de::Unexpected::Str(value), &self))
            }
        }
        deserializer.deserialize_any(FlexibleU32Visitor)
    }
}
fn main() -> serde_json::Result<()> {
    let json1 = r#"{"name": "John", "age": 30}"#;
    let json2 = r#"{"name": "Alice", "age": "25"}"#;
    let person1: Person = serde_json::from_str(json1)?;
    let person2: Person = serde_json::from_str(json2)?;
    println!("{:?}", person1);
    println!("{:?}", person2);
    Ok(())
}
</code></pre>
