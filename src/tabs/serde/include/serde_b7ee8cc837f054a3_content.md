



Задача этого метода — сопоставить тип с моделью данных Serde, предоставив десериализатору Visitor, который может управляться десериализатором для создания экземпляра вашего типа.
Это достигается с помощью трейта Deserialize и создания специального визитера (Visitor), который отвечает за преобразование данных из строки, чисел, массивов или объектов в ваш тип.
<pre><code class="language-rust">
pub trait Deserialize<'de>: Sized {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>;
}
</code></pre>
