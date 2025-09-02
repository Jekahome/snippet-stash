


<pre><code class="language-rust">
fn main(){
    let mut vec = vector![3, 2, 5, 4, 1];
    vec.sort_by(|left, right| left.cmp(right));
    assert_eq!(vector![1, 2, 3, 4, 5], vec)
}
</code></pre>
