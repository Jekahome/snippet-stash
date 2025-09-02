


<pre><code class="language-rust">
// Пример реализации ф-ции split_at_mut для среза i32
fn split_at_mut(slice: &mut [i32], mid: usize) -> (&mut [i32], &mut [i32]) {
    let len = slice.len();

    assert!(mid <= len);// мы проверяем что разделитель попадает в размер среза 
     // Rust компилятор не допускает заимствования среза дважды хотя мы знаем что срезы не пересекаются
    (&mut slice[..mid], &mut slice[mid..])
}

// Перепишем на unsafe реализацию где мы сами гарантируем непересекаемость срезов
use std::slice;
fn split_at_mut(slice: &mut [i32], mid: usize) -> (&mut [i32], &mut [i32]) {
    let len = slice.len();
    let ptr:*mut i32 = slice.as_mut_ptr();// доступ к необработанному указателю среза с типом *mut i32

    assert!(mid <= len);

    unsafe {
        (slice::from_raw_parts_mut(ptr, mid),
         slice::from_raw_parts_mut(ptr.offset(mid as isize), len - mid))
    }
//from_raw_parts_mut для создания среза, который начинается с ptr и mid длится долго.
// Затем мы вызываем offset метод on ptrс mid аргументом для получения исходного указателя, который начинается с mid,
// и мы создаем срез, используя этот указатель, и оставшееся количество элементов после midдлины.
}
// Обратите внимание, что нам не нужно отмечать результирующую split_at_mut функцию как unsafe, и мы можем назвать эту функцию безопасным Rust.
// Мы создали безопасную абстракцию для небезопасного кода с реализацией функции, которая безопасно использует unsafe код, 
//поскольку она создает только действительные указатели из данных, к которым имеет доступ эта функция
}
fn main(){
    let mut vec_to_split = vec![1, 2, 3, 4, 5, 6];
    let ref_to_vec = &mut vec_to_split[..];
    let (part_1, part_2) = split_at_mut(ref_to_vec,3);
    assert_eq!(part_1, &mut [1, 2, 3]);
    assert_eq!(part_2, &mut [4, 5, 6]);
}
</code></pre>
