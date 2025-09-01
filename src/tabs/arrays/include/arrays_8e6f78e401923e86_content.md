


<pre><code class="language-rust">
fn main(){
    let x = &mut [1, 2, 4];
    let x_ptr = x.as_mut_ptr();

    unsafe {
        for i in 0..x.len() {
            *x_ptr.offset(i as isize) += 2;
        }
    }
    assert_eq!(x, &[3, 4, 6]);
}
</code></pre>
