


Файл Cargo.toml:
```toml
[dependencies]
uuid = { version = "1", features = ["serde", "v4"] }
serde = { version = "1", features = ["derive"] }
serde_json = "1"
```
uuid поддерживает сериализацию с использованием serde
<pre><code class="language-rust">
use serde::{Serialize, Deserialize};
use uuid::Uuid;

#[derive(Serialize, Deserialize, Debug)]
struct User {
    id: Uuid,
    name: String,
}

fn main() {
    // Генерируем нового пользователя с UUID v4
    let user = User {
        id: Uuid::new_v4(),
        name: "Alice".to_string(),
    };

    // Сериализация в JSON
    let json = serde_json::to_string_pretty(&user).unwrap();
    println!("JSON:\n{}", json);

    // Десериализация обратно в структуру
    let deserialized: User = serde_json::from_str(&json).unwrap();
    println!("Десериализованный: {:?}", deserialized);

    // Пример: создание UUID из строки
    let parsed = Uuid::parse_str("f47ac10b-58cc-4372-a567-0e02b2c3d479").unwrap();
    println!("Парсинг UUID: {}", parsed);
}
</code></pre>

Вывод:
```
JSON:
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Alice"
}
Десериализованный: User { id: 550e8400-e29b-41d4-a716-446655440000, name: "Alice" }
Парсинг UUID: f47ac10b-58cc-4372-a567-0e02b2c3d479
```

