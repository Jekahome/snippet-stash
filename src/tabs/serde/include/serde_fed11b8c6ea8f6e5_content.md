

Задача метода  `fn serialize<T>` — взять ваш тип (&self) и сопоставить его с моделью данных Serde, вызвав ровно один из методов данного Serializer

Сериализация примитива:
<pre><code class="language-rust">
impl Serialize for i32 {
    fn serialize<T>(&self, serializer: T) -> Result<T::Ok, T::Error> where T: Serializer {
        serializer.serialize_i32(*self)
    }
}
fn main() -> serde_json::Result<()> { 
    let s = 7i32;
    let s_string = serde_json::to_string(&s).unwrap();// Serialize
    println!("serialized = {}", s_string);// 7
}
</code></pre>
