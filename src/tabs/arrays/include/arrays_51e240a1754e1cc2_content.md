


<pre><code class="language-rust">
fn main(){
    #![feature(get_many_mut)]
    let v = &mut [1, 2, 3];
    if let Ok([a, b]) = v.get_many_mut([0, 2]) {
        *a = 413;
        *b = 612;
    }
    assert_eq!(v, &[413, 2, 612]);
}
</code></pre>
