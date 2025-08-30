


<pre><code class="language-rust">
use std::mem;
fn main(){
 unsafe {
    let a = [0u8, 0u8, 0u8, 0u8];
    let b = mem::transmute::<[u8; 4], u32>(a);
 }
}
</code></pre>
