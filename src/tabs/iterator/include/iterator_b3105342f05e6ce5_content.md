


<pre><code class="language-rust">
fn main(){
    let a = [1, 2, 3];
    let mut iter = a.iter();
    assert_eq!(Some(&1), iter.next());
    assert_eq!(Some(&2), iter.next());
}
</code></pre>
