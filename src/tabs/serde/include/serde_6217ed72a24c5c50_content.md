

Составные типы следуют трех этапному процессу: **инициализация, элементы, завершение**.
<pre><code class="language-rust">

use serde::ser::{Serialize, Serializer, SerializeSeq, SerializeMap};

impl<T> Serialize for Vec<T>
where
    T: Serialize,
{
    fn serialize<K>(&self, serializer: K) -> Result<K::Ok, K::Error>
    where
        K: Serializer,
    {
        let mut seq = serializer.serialize_seq(Some(self.len()))?;// инициализация
        for e in self {
            seq.serialize_element(e)?; // элементы
        }
        seq.end() // завершение
    }
}

impl<K, V> Serialize for MyMap<K, V>
where
    K: Serialize,
    V: Serialize,
{
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: Serializer,
    {
        let mut map = serializer.serialize_map(Some(self.len()))?;
        for (k, v) in self {
            map.serialize_entry(k, v)?;
        }
        map.end()
    }
}
</code></pre>
