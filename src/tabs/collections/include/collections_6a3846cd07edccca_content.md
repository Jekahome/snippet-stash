


<pre><code class="language-rust">
fn main(){
// Добавляет значение в набор, заменяя существующее значение, если оно есть, которое равно заданному. Возвращает замененное значение.
    let mut set = HashSet::new();
    set.insert(Vec::<i32>::new());

    assert_eq!(set.get(&[][..]).unwrap().capacity(), 0);
    set.replace(Vec::with_capacity(10));
    assert_eq!(set.get(&[][..]).unwrap().capacity(), 10);
}
</code></pre>
