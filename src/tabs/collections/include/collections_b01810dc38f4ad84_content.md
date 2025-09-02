


<pre><code class="language-rust">
fn main(){
    // Содержит по крайней мере все значения в self
    let sup: HashSet<_> = [1, 2, 3].iter().cloned().collect();
    let mut set = HashSet::new();

    assert_eq!(set.is_subset(&sup), true);
    set.insert(2);
    assert_eq!(set.is_subset(&sup), true);
    set.insert(4);
    assert_eq!(set.is_subset(&sup), false);
}
</code></pre>
