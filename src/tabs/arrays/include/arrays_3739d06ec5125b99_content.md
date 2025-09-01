


<pre><code class="language-rust">
fn main(){
    // split_at_spare_mut (&mut self) -> (&mut [T] , &mut [ MaybeUninit <T>])
   //  Возвращает содержимое вектора в виде части T, а также оставшуюся свободную емкость вектора в виде части MaybeUninit<T>

    #![feature(vec_split_at_spare)]

    let mut v = vec![1, 1, 2];

    // Зарезервируйте дополнительное место, достаточное для 10 элементов.
    v.reserve(10);

    let (init, uninit) = v.split_at_spare_mut();
    let sum = init.iter().copied().sum::<u32>();

    // Заполните следующие 4 элемента.
    uninit[0].write(sum);
    uninit[1].write(sum * 2);
    uninit[2].write(sum * 3);
    uninit[3].write(sum * 4);

    // Отметьте 4 элемента вектора как инициализированные.
    unsafe {
        let len = v.len();
        v.set_len(len + 4);
    }

    assert_eq!(&v, &[1, 1, 2, 4, 8, 12, 16]);
}
</code></pre>
