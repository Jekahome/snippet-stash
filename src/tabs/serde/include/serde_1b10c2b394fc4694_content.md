

deserialize_map

Использование deserialize_map вместо deserialize_struct дает большую гибкость за счет того, что этот метод не накладывает жестких требований на структуру входных данных.

1. Динамические или неизвестные поля
С deserialize_map вы можете динамически прочитать все поля и сохранить их, например, в HashMap или игнорировать ненужные:
```
while let Some(key) = map.next_key::<String>()? {
    match key.as_str() {
        "name" => name = Some(map.next_value()?),
        "age" => age = Some(map.next_value()?),
        _ => {
            // Сохраняем дополнительные поля
            extra_fields.insert(key, map.next_value()?);
        }
    }
}
```


2. Обработка неизвестных структур
Если вы работаете с данными, структура которых заранее неизвестна, deserialize_map предоставляет возможность анализировать ключи и значения на лету.

```json
{
    "type": "person",
    "data": {
        "name": "John",
        "age": 30
    }
}
```
Вы можете обработать ключ type, чтобы решить, какую структуру десериализовать дальше.

3. Пропуск или обработка неизвестных ключей
С помощью deserialize_map вы можете легко игнорировать ключи, которые вам не нужны.
<pre><code class="language-rust">
match key.as_str() {
    "name" => name = Some(map.next_value()?),
    "age" => age = Some(map.next_value()?),
    _ => {
        let _ = map.next_value::<de::IgnoredAny>()?; // Игнорируем поле
    }
}
</code></pre>


4. Работа с вложенными структурами без явных определений
Если вложенные объекты имеют произвольный или переменный формат, deserialize_map позволяет обработать их без создания соответствующих структур
```rust
fn main(){
    let data: HashMap<String, serde_json::Value> = map.next_value()?;
}
```

