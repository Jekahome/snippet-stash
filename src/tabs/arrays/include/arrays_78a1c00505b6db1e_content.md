


<pre><code class="language-rust">
fn main(){
    let mut vec = Vec::with_capacity(10);
    vec.extend([1, 2, 3]);

    assert_eq!(vec.capacity(), 10);
    let slice = vec.into_boxed_slice();
    assert_eq!(slice.into_vec().capacity(), 3);
}
</code></pre>
