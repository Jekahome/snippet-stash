


<pre><code class="language-rust">
fn main(){
// Получает итератор по ключам карты в отсортированном порядке.
    let mut a = BTreeMap::new();
    a.insert(2, "b");
    a.insert(1, "a");

    let keys: Vec<_> = a.keys().cloned().collect();
    assert_eq!(keys, [1, 2]);
}
</code></pre>
