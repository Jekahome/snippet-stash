


<pre><code class="language-rust">
fn main(){
    let mut samples_src:Vec<i16> = vec![4;8];         
// ManuallyDrop - это оболочка типа, которая запрещает компилятору Rust автоматически вызывать деструктор базового типа.
    let mut m = std::mem::ManuallyDrop::new(samples_src); // или into_raw_parts но самостоятельно освободить указатель через from_raw_parts

    let (p,len,cap) = (m.as_mut_ptr(),m.len(),m.capacity());
            
// корректно освободить ресурсы
    let samples_dst: Vec<u8> = unsafe { Vec::from_raw_parts(p as *mut u8, len, cap) };
// либо
    unsafe{
       ManuallyDrop::drop(&mut m);// ps. но не оба сразу способа `free(): double free detected in tcache 2`
    }
}
</code></pre>
