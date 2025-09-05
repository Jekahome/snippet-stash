


<pre><code class="language-rust">
use serde::de::{self, Deserializer, Visitor, MapAccess};
use serde::Deserialize;
use std::fmt;

#[derive(Debug)]
struct Person {
    name: String,
    age: u32,
}

// Реализуем Deserialize вручную
impl<'de> Deserialize<'de> for Person {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
        // Создаем визитер для обработки данных
        struct PersonVisitor;

        impl<'de> Visitor<'de> for PersonVisitor {
            type Value = Person;

            fn expecting(&self, formatter: &mut fmt::Formatter) -> fmt::Result {
                formatter.write_str("a map with keys `name` and `age`")
            }

            fn visit_map<M>(self, mut map: M) -> Result<Self::Value, M::Error>
            where
                M: MapAccess<'de>,
            {
                // При инициализации с None, компилятор оставляет тип этих переменных неявным Option<T>
                // let mut name = None::<String>;
                // let mut age = None::<u32>;
               let mut name = None;
               let mut age = None;

                while let Some(key) = map.next_key::<String>()? {
                    match key.as_str() {
                        "name" => {
                            if name.is_some() {
                                return Err(de::Error::duplicate_field("name"));
                            }
                            name = Some(map.next_value()?);
                        }
                        "age" => {
                            if age.is_some() {
                                return Err(de::Error::duplicate_field("age"));
                            }
                            age = Some(map.next_value()?);
                        }
                        _ => {
                            let _: de::IgnoredAny = map.next_value()?; // Игнорируем неизвестные поля
                        }
                    }
                }

                let name = name.ok_or_else(|| de::Error::missing_field("name"))?;
                let age = age.ok_or_else(|| de::Error::missing_field("age"))?;

                Ok(Person { name, age })
            }
        }

        // Запускаем десериализацию с нашим визитером
        // deserialize_struct строго следует струтуре выходного обьекта
        // const FIELDS: &[&str] = &["name", "age"];
        // deserializer.deserialize_struct("Person", FIELDS, PersonVisitor)
        
       // но можно и через метод deserialize_any так как тип JSON самоописывающийся
       // deserializer.deserialize_any(PersonVisitor)

        // deserialize_map более гибок чем deserialize_struct, и может "на лету" добавлять динамические поля
        deserializer.deserialize_map(PersonVisitor)
    }
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let json = r#"{"name": "Alice", "age": 30}"#;

    // Десериализуем JSON в структуру
    let person: Person = serde_json::from_str(json)?;
    println!("{:?}", person);

    Ok(())
}
</code></pre>
