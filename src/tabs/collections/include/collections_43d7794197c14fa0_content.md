


<pre><code class="language-rust">
fn main(){
    let vec = vector!["Joe", "Mike", "Robert"];
    assert_eq!(Some(&"Robert"), vec.get(2));
    assert_eq!(None, vec.get(5));
}
</code></pre>
