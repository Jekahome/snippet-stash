


<pre><code class="language-rust">
fn main(){
    #![feature(vec_into_raw_parts)]
    let v: Vec<i32> = vec![-1, 0, 1];

    let (ptr, len, cap) = v.into_raw_parts();

    let rebuilt = unsafe {
        // Теперь мы можем вносить изменения в компоненты, например 
        // преобразование необработанного указателя в совместимый тип.
        let ptr = ptr as *mut u32;

        Vec::from_raw_parts(ptr, len, cap)
    };
    assert_eq!(rebuilt, [4294967295, 0, 1]);
}
</code></pre>
