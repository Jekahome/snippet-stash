


<pre><code class="language-rust">
fn main(){
//iter_mut  Получает измененный итератор по элементам карты, отсортированным по ключу
    let mut map = BTreeMap::new();
    map.insert("a", 1);
    map.insert("b", 2);
    map.insert("c", 3);
    
    for (key, value) in map.iter_mut() {
        if key != &"a" {
            *value += 10;
        }
    }
}
</code></pre>
