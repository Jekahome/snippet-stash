

Чтобы избежать утечки памяти, указатель должен быть преобразован обратно в Rc, используя Rc::from_raw
<pre><code class="language-rust">
fn main(){
    let x = Rc::new(10);
    let x_ptr:*const i32 = Rc::into_raw(x);
    assert_eq!(unsafe { *x_ptr }, 10);

    //Rc::from_raw обратное преобразование в указатель
    unsafe {
        // Чтобы предотвратить утечку, вернитесь к `Rc`
        let x = Rc::from_raw(x_ptr);
        assert_eq!(*x, 10);
        // Дальнейшие вызовы `Rc :: from_raw (x_ptr)` будут опасны для памяти.
    }
}
</code></pre>
