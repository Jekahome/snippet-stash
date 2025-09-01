


<pre><code class="language-rust">
fn main(){
    let mut v = [-5i32, 4, 32, -3, 2];
    v.sort_by_cached_key(|k| k.to_string());
    assert!(v == [-3, -5, 2, 32, 4]);
}
</code></pre>
