


<pre><code class="language-rust">
fn main(){
// Удаляет значение из набора. Возвращает true, если значение присутствовало в наборе. 
    let mut set = HashSet::new();

    set.insert(2);
    assert_eq!(set.remove(&2), true);
    assert_eq!(set.remove(&2), false);
}
</code></pre>
