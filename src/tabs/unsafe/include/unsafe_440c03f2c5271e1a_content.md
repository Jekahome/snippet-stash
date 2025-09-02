

А вот такой код не является безопасной абстракцией так как самому коду мы не доверяем поскольку он обращается к произвольной памятью которой мы не владеем.
<pre><code class="language-rust">
use std::slice;
fn main(){
    let address = 0x012345usize;
    let r = address as *mut i32;

    let slice = unsafe {
        slice::from_raw_parts_mut(r, 10000)
    };
}
</code></pre>
