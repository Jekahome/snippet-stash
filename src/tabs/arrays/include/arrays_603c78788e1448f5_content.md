

File Cargo.toml:
```toml
[dependencies]
dhat = "0.3" 

[[example]]
name = "dhat"
path ="examples/dhat_ex.rs"

[profile.release]
debug = 1

[features]
dhat-heap = []    # if you are doing heap profiling
dhat-ad-hoc = []  # if you are doing ad hoc profiling
```

---

<pre><code class="language-rust">
#![feature(vec_into_raw_parts)]
#[cfg(feature = "dhat-heap")]
#[global_allocator]
static ALLOC: dhat::Alloc = dhat::Alloc;
 
// Run:
//  cargo +nightly run --example dhat --features dhat-heap 
//
// Show:
//  open url https://nnethercote.github.io/dh_view/dh_view.html and send file `dhat-heap.json`
//
// Output:
// dhat: Total:     6,000 bytes in 2 blocks
// dhat: At t-gmax: 6,000 bytes in 2 blocks
// dhat: At t-end:  4,000 bytes in 1 blocks (Должно быть 0 bytes)
//
// Где:
// dhat: Total:     6,000 bytes in 2 blocks => [0i16;1000] + [0i32;1000] = 2000 + 4000 = 6000 bytes
// dhat: At t-end:  4,000 bytes in 1 blocks => из 6000 байт аллоцированных осталось не освобожденных 4000 байт т.е. освободили только 2000 байт ([0i16;1000])
fn main(){
    // dhat block #############################################################################
    #[cfg(feature = "dhat-heap")]
    let _profiler = dhat::Profiler::new_heap();
    // ########################################################################################
    {
        let v: Vec<i16> = vec![0i16;1000];// 2000 bytes (1000*2 bytes)
        let v_2: Vec<i32> = vec![0i32;1000]; // 4000 bytes (1000*4 bytes)

        // После вызова этой функции вызывающая сторона отвечает за память, ранее управляемую Vec. 
        // Единственный способ сделать это - преобразовать исходный указатель, длину и емкость обратно в Vec 
        // с from_raw_parts функцией, позволяя деструктору выполнить очистку.
        let (ptr, len, cap) = v.into_raw_parts();

        let (ptr_2, len_2, cap_2) = v_2.into_raw_parts();

        let v_rebuilt: Vec<i16> = unsafe {
            // Теперь мы можем вносить изменения в компоненты, 
            // например преобразовывать необработанный указатель в совместимый тип.`let ptr = ptr as *mut u32;` с потерей отрицательных значений

            // отдадим необработанный указатель обратно для освобождения занимаемой им памяти после выхода из области видимости (RAII)  
            Vec::from_raw_parts(ptr, len, cap)
        };
    }
}
</code></pre>
