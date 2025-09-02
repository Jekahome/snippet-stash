


<pre><code class="language-rust">
use std::ptr;
fn main(){
    let mut vec = vec![0u32; 4];
    unsafe {
        let vec_ptr = vec.as_mut_ptr();
        std::ptr::write_bytes(vec_ptr, 254, 2);// заполнить первых два значения u32 полностью значенеиями 254u8
    }
    assert_eq!(4278124286,u32::from_be_bytes([254,254,254,254]));
    assert_eq!(vec, [4278124286, 4278124286, 0, 0]);
}
</code></pre>
