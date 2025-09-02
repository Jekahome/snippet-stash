


<pre><code class="language-rust">
fn main(){
    // явное приведение
    let mut y = 10;
    let raw_mut = &mut y as *mut i32;
    //  ----------------------------------------- 
    let i: u32 = 1;

    // явное приведение
    let p_imm: *const u32 = &i as *const u32;

    // неявное принуждение
    let mut m: u32 = 2;
    let p_mut: *mut u32 = &mut m;

    // Чтобы получить указатель на значение. Разыменование с помощью конструкции `&*x` является более предпочтительным, чем с использованием transmute.
    unsafe {
        let ref_imm: &u32 = &*p_imm;
        let ref_mut: &mut u32 = &mut *p_mut;
    }
}
</code></pre>

