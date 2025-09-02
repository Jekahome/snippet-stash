


<pre><code class="language-rust">
fn main(){
// Общие значения
    let a: HashSet<_> = [1, 2, 3].iter().cloned().collect();
    let b: HashSet<_> = [4, 2, 3, 4].iter().cloned().collect();

// печатает 2, 3 в произвольном порядке
    for x in a.intersection(&b) {
        println!("{}", x);
    }

    let intersection: HashSet<_> = a.intersection(&b).collect();
    assert_eq!(intersection, [2, 3].iter().collect());
}
</code></pre>
