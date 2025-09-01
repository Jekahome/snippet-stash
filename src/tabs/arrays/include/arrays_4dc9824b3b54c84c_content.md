


<pre><code class="language-rust">
fn main(){
    let slice = [10, 40, 33, 20];
    let mut iter = slice.split_inclusive(|num| num % 3 == 0);

    assert_eq!(iter.next().unwrap(), &[10, 40, 33]);
    assert_eq!(iter.next().unwrap(), &[20]);
    assert!(iter.next().is_none());
}
</code></pre>
