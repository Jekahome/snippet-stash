


<pre><code class="language-rust">
fn main(){
    // Выделить вектор достаточно большого размера для 10 элементов.
    let mut v = Vec::with_capacity(10);

    // Заполните первые 3 элемента.
    let uninit = v.spare_capacity_mut();
    uninit[0].write(0);
    uninit[1].write(1);
    uninit[2].write(2);

    // Отметить первые 3 элемента вектора как инициализированные.
    unsafe {
        v.set_len(3);
    }

    assert_eq!(&v, &[0, 1, 2]);
}
</code></pre>
