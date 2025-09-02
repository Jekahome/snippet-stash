


<pre><code class="language-rust">
fn main(){
// Разность
    let a: HashSet<_> = [1, 2, 3].iter().cloned().collect();
    let b: HashSet<_> = [4, 2, 3, 4].iter().cloned().collect();
   // println!("{:?}",b); { 4, 2, 3}
// Разность a - b
    for x in a.difference(&b) {
        println!("{}", x); // Print 1
    }

    let diff: HashSet<_> = a.difference(&b).collect();
    assert_eq!(diff, [1].iter().collect());

// Обратите внимание, что разность не симметрична, 
// и `b - a` означает нечто другое:
    let diff: HashSet<_> = b.difference(&a).collect();
    assert_eq!(diff, [4].iter().collect());
}
</code></pre>
