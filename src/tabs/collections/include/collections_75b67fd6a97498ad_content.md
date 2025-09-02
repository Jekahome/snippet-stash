


<pre><code class="language-rust">
use std::collections::HashMap;
fn main(){
// При вставке нового значение возвращается None
// в случае вставки существующего ключа значение перезаписывается и возвращается старое значение
    let mut map = HashMap::new();
    assert_eq!(map.insert(37, "a"), None);
    assert_eq!(map.is_empty(), false);

    map.insert(37, "b");
    assert_eq!(map.insert(37, "c"), Some("b"));
    assert_eq!(map[&37], "c");
}
</code></pre>
