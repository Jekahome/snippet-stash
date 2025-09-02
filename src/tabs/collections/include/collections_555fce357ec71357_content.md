


<pre><code class="language-rust">
fn main(){
// Обьединение 
    let a: HashSet<_> = [1, 2, 3].iter().cloned().collect();
    let b: HashSet<_> = [4, 2, 3, 4].iter().cloned().collect();

    // Print 1, 2, 3, 4 in arbitrary order.
    for x in a.union(&b) {
        println!("{}", x);
    }

    let union: HashSet<_> = a.union(&b).collect();
    assert_eq!(union, [1, 2, 3, 4].iter().collect());
}
</code></pre>
