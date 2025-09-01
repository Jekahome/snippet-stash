


<pre><code class="language-rust">
fn main(){
    #![feature(iter_intersperse)]
    let mut a = [0, 1, 2].iter().intersperse(&100);
    assert_eq!(a.next(), Some(&0));   // The first element from `a`.
    assert_eq!(a.next(), Some(&100)); // The separator.
    assert_eq!(a.next(), Some(&1));   // The next element from `a`.
    assert_eq!(a.next(), Some(&100)); // The separator.
}
</code></pre>
