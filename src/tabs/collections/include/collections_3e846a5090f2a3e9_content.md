


<pre><code class="language-rust">
fn main(){
// Симметричная разность   
// Уникальные значения А которых нет в В + наоборот уникальные значения В корорых нет в А

    let a: HashSet<_> = [1, 2, 3].iter().cloned().collect();
    let b: HashSet<_> = [4, 2, 3, 4].iter().cloned().collect();

    // Print 1, 4 in arbitrary order.
    for x in a.symmetric_difference(&b) {
        println!("{}", x);
    }

    let diff1: HashSet<_> = a.symmetric_difference(&b).collect();
    let diff2: HashSet<_> = b.symmetric_difference(&a).collect();

    assert_eq!(diff1, diff2);
    assert_eq!(diff1, [1, 4].iter().collect());
}
</code></pre>
