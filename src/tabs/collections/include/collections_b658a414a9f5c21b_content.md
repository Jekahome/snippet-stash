


<pre><code class="language-rust">
use std::collections::HashMap;
use indexmap::IndexMap;

fn main() {
    let mut hash_map = HashMap::new();
    hash_map.insert("a", 1);
    hash_map.insert("b", 2);
    hash_map.insert("c", 3);

    let mut index_map = IndexMap::new();
    index_map.insert("a", 1);
    index_map.insert("b", 2);
    index_map.insert("c", 3);

    println!("HashMap:");
    for (key, value) in &hash_map {
        println!("{}: {}", key, value); // Порядок может быть произвольным
    }

    println!("IndexMap:");
    for (key, value) in &index_map {
        println!("{}: {}", key, value); // Порядок сохраняется
    }
}
</code></pre>
