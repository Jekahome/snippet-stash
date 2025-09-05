

Атрибут, указывающий, что представление типа совпадает с его единственным полем

`#[serde(transparent)]`


<pre><code class="language-rust">
use serde::{Serializer,Deserializer}; 
#[derive(Serialize, Deserialize)]
#[serde(transparent)]
//#[derive(Debug)]
struct Transparent(String);

// или 

impl Serialize for Transparent {
    fn serialize<T>(&self, serializer: T) -> std::result::Result<T::Ok, T::Error>
        where T: Serializer
    {
        self.0.serialize(serializer)
    }
}
impl<'de> Deserialize<'de> for Transparent {
    fn deserialize<D>(deserializer: D) -> std::result::Result<Self, D::Error>
        where D: Deserializer<'de>
    {
        Deserialize::deserialize(deserializer).map(Transparent)
    }
}
</code></pre>
