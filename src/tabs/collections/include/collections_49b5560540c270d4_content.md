

Использование быстрой хеш функции (не рекомендуется если есть угроза к DoS атакам)
<pre><code class="language-rust">
use fnv::FnvHashMap;
fn main(){
    let mut map = FnvHashMap::default();
    map.insert(1, "one");
    map.insert(2, "two");
}
</code></pre>

---

```toml
[dependencies]
ahash = "0.7.4"
```

<pre><code class="language-rust">
use std::collections::HashMap;
fn main(){
    let h = HashMap<i32, String, ahash::RandomState>;
}
</code></pre>
