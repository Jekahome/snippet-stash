

serde не полагается на механизм отражения во время выполнения (но использует систему признаков Rust ), что устраняет большинство затрат времени исполнения

Для необычных нужд Serde позволяет полностью настроить поведение сериализации путем ручной реализации Serialize/Deserialize свойств для вашего типа.
 
<pre><code class="language-rust no_run edition2024">
pub trait Serialize {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer;
}
</code></pre>
