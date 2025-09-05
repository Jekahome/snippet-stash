

Макрос **json!** преобразует Rust-значения в экземпляры serde_json::Value. 
Например:
<pre><code class="language-rust no_run edition2024">
fn main(){
    "text" → Value::String("text".to_string())
    123 → Value::Number(123)
    [1, 2, 3] → Value::Array(vec![Value::Number(1), Value::Number(2), Value::Number(3)])
    { "key": "value" } → Value::Object(Map::from_iter(vec![("key".to_string(), Value::String("value".to_string()))]))
}
</code></pre>

---

<pre><code class="language-rust">
use serde_json::json;
fn main(){
    let object:serde_json::Value = json!({
        "code": 200,
        "success": true,
        "payload": {
            "features": [
                "serde",
                "json"
            ],
            "homepage": null
        }
    });
}
</code></pre>

---

Без макроса **json!**, создание такой структуры было бы менее удобным:
<pre><code class="language-rust">
use serde_json::{Map, Value};
fn main() {
    let mut address = Map::new();
    address.insert("city".to_string(), Value::String("Wonderland".to_string()));
    address.insert("postcode".to_string(), Value::Number(12345.into()));

    let mut object = Map::new();
    object.insert("name".to_string(), Value::String("Alice".to_string()));
    object.insert("age".to_string(), Value::Number(30.into()));
    object.insert("is_admin".to_string(), Value::Bool(true));
    object.insert("hobbies".to_string(), Value::Array(vec![
        Value::String("reading".to_string()),
        Value::String("cycling".to_string())
    ]));
    object.insert("address".to_string(), Value::Object(address));

    println!("{}", Value::Object(object));
}
</code></pre>

