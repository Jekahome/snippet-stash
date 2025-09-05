


<pre><code class="language-rust">
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use serde_json;
fn main() {
    let my_string = "Hello, World!".to_string();
    let my_str: &str = "Hello, World!";
    let my_number: usize = 42;
    let my_vec = vec![1, 2, 3];
    let mut my_map = HashMap::new();
    {
        my_map.insert("key1", "value1");
        my_map.insert("key2", "value2");
    }

    let serialized:String = serde_json::to_string(&my_string).unwrap();
    assert_eq!("\"Hello, World!\"", serialized); // "Hello, World!"
    let deserialize: String  = serde_json::from_str(&serialized).unwrap();
    assert_eq!("Hello, World!", deserialize);
 
    let serialized:String = serde_json::to_string(&my_str).unwrap();
    assert_eq!("\"Hello, World!\"", serialized); // "Hello, World!"
    let deserialize: &str  = serde_json::from_str(&serialized).unwrap();
    assert_eq!("Hello, World!", deserialize);
    
    let serialized:String = serde_json::to_string(&my_number).unwrap();
    assert_eq!("42", serialized); // "42"
    let deserialize: usize  = serde_json::from_str(&serialized).unwrap();
    assert_eq!(42_usize, deserialize);
    
    let serialized:String = serde_json::to_string(&my_vec).unwrap();
    assert_eq!("[1,2,3]", serialized); // [1,2,3]
    let deserialize: Vec<i32>  = serde_json::from_str(&serialized).unwrap();
    assert_eq!([1,2,3].to_vec(), deserialize);
    
    let serialized:String = serde_json::to_string(&my_map).unwrap();
    // ключи могут иметь другой порядок!
    assert_eq!("{\"key1\":\"value1\",\"key2\":\"value2\"}", serialized); // {"key1":"value1","key2":"value2"}
    let deserialize: HashMap<&str,&str> = serde_json::from_str(&serialized).unwrap();
    assert_eq!(my_map, deserialize);
}
</code></pre>
