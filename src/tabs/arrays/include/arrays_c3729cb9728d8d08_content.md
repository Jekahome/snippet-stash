


<pre><code class="language-rust">
fn main(){
    let mut arr:[i32;3] = From::from((1,2,3));
    let slice:&[i32] = arr.as_slice();
    let slice:&mut [i32] = arr.as_mut_slice();
}
</code></pre>
