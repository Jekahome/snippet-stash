


<pre><code class="language-rust">
fn main(){
    // если множество является надмножеством другого, то есть self содержит по крайней мере все значения в другом.
    let sub: HashSet<_> = [1, 2].iter().cloned().collect();
    let mut set = HashSet::new();

    assert_eq!(set.is_superset(&sub), false);

    set.insert(0);
    set.insert(1);
    assert_eq!(set.is_superset(&sub), false);

    set.insert(2);
    assert_eq!(set.is_superset(&sub), true);
}
</code></pre>
