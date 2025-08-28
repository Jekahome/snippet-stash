


<pre><code class="language-rust">
use std::fmt::Debug; use std::borrow::Borrow; use std::fmt::Display; use std::hash::Hash;
fn main() {
let mut h = HashMap{fields:vec![]};
   // сохраняем String ,HashMap владеит
     h.insert("KEY".to_string(),"VALUE".to_string());
   // поиск через &str
    println!("{:?}",h.get("KEY"));
}

pub struct HashMap<K, V> {
  fields:Vec<(K,V)>
}

impl<K, V> HashMap<K, V> {
    pub fn insert(&mut self, key: K, value: V)  
    {
        self.fields.push((key,value));
    }

    pub fn get<Q>(&self, k: &Q) -> Option<&V>
    where
        K: Borrow<Q>,
        Q: Hash + ?Sized
    {
        Some(&self.fields[0].1)
    }
}
</code></pre>
