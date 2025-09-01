


<pre><code class="language-rust">
fn as_slice<'a>(xs: Option<&'a Vec<i32>>) -> &'a [i32] {
    match xs {
        Some(xs) => xs.as_slice(),
        None => &[],
    }
}
</code></pre>
