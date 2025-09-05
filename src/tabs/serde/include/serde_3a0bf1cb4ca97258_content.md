


<pre><code class="language-rust">
#[derive(Debug)]
struct Something(i32);
impl Serialize for Something {
    fn serialize<T>(&self, serializer: T) -> core::result::Result<T::Ok, S::Error> where T: serde::Serializer {
        serializer.serialize_newtype_struct("Something",&self.0)
    }
}
fn main() -> serde_json::Result<()> {  
    let s = Something(25);
    let s_string = serde_json::to_string(&s).unwrap();// Serialize
    println!("serialized = {}", s_string);// 25
}
</code></pre>
