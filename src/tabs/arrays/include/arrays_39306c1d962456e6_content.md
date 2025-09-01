


<pre><code class="language-rust">
fn main(){
    let mut x = &mut [0, 1, 2];

    if let Some((first, elements)) = x.split_first_mut() {
        *first = 3;
        elements[0] = 4;
        elements[1] = 5;
    }
    assert_eq!(x, &[3, 4, 5]);
}
</code></pre>
