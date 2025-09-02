

Указатель на mut null 
<pre><code class="language-rust">
fn main(){
    let p: *mut i32 = std::ptr::null_mut();
    assert!(p.is_null());
}
</code></pre>
