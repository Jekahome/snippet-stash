

**1. Через метод deserialize_any**. Форматы данных с самоописанием, такие как JSON, YAML, XML, позволяют просматривать сериализованные данные и определять, что они представляют.
     Например: понять их тип (например, строка, число, карта, массив и т. д.) {} — это карта (map), [] — это массив (sequence), "..." — это строка (string). 
     Если формат данных поддерживает Deserializer::deserialize_any, он будет управлять Visitor. JSON использует этот подход при десериализации serde_json::Value, который представляет собой перечисление, которое может представлять любой документ JSON.В зависимости от входных данных будет вызван Deserializer один из методов Visitor 
Когда вы десериализуете в тип serde_json::Value, используется deserialize_any
<pre><code class="language-rust no_run edition2024">
fn main(){
     let json_data = r#"{ "key": "value", "number": 42 }"#;
    // Десериализация в Value через deserialize_any
    let value: serde_json::Value = serde_json::from_str(json_data)?;
}
</code></pre>

**2. Через конкретные методы `deserialize_*` для конкретных типов**. Эти методы используются для форматов без самоописания, таких как Postcard, Bincode, или MessagePack.
Форматы без самоописания не способны десериализовать что-то вроде serde_json::Value




