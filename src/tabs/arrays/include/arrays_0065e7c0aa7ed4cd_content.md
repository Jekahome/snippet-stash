


<pre><code class="language-rust">
fn main(){
    let slice = ['l', 'o', 'r', 'e', 'm'];
    let mut iter = slice.rchunks(2);
    assert_eq!(iter.next().unwrap(), &['e', 'm']);
    assert_eq!(iter.next().unwrap(), &['o', 'r']);
    assert_eq!(iter.next().unwrap(), &['l']);
    assert!(iter.next().is_none());
}
</code></pre>
