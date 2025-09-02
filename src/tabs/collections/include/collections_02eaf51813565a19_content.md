


<pre><code class="language-rust">
fn main(){
// Проверка пересечения
    let a: HashSet<_> = [1, 2, 3].iter().cloned().collect();
    let mut b = HashSet::new();
    b.insert(1);
    // пересечение пустое ?
    assert_eq!(a.is_disjoint(&b), false);
    // аналогично
    let intersection: HashSet<_> = a.intersection(&b).collect();
    assert_eq!(intersection.is_empty(),false);
}
</code></pre>
