

Размер вектора это размер трех частей которые лежат на стеке:
* 1 указатель на данные 
* 2 длина вектора  
* 3 его ёмкость

`src = { data: *mut [i32], length: usize, capacity: usize }`

Box для n элементов:
<pre><code class="language-rust no_run edition2021">
pub struct Vec<T> {
    /// Указатель на данные в куче.
    ptr: *const T,
    /// Длина.Количество элементов в векторе.
    /// Инвариант: len <= capacity.
    len: usize,
    /// Емкость.Количество слотов в векторе (capacity).
    /// Увеличивается в 2 раза при заполнении длины.
    cap: usize,
}
</code></pre>

---


Вектор определяется тремя словами: указатель на данные, длина вектора и его ёмкость. 
Ёмкость определяет, сколько памяти резервируется для вектора. 
Вектор может увеличиваться, пока его длина меньше его ёмкости. 
При необходимости превысить заданное значение объёма, вектору повторно выделяется память большего объёма.

<pre><code class="language-rust">
fn main(){
    use std::mem::size_of;
    assert_eq!(size_of::<Vec<i32>>(), size_of::<usize>() * 3);

    let mut xs = vec![1, 2, 3];
    xs.push(4);
    assert_eq!(xs.len(), 4);
    assert_eq!(xs[2], 3);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    #![feature(vec_into_raw_parts)]

    let v: Vec<i32> = vec![-1, 0, 1];

// После вызова этой функции вызывающая сторона отвечает за память, ранее управляемую Vec. 
// Единственный способ сделать это - преобразовать исходный указатель, длину и емкость обратно в Vec 
// с from_raw_parts функцией, позволяя деструктору выполнить очистку.
    let (ptr, len, cap) = v.into_raw_parts();

    let v_rebuilt: Vec<i32> = unsafe {
// Теперь мы можем вносить изменения в компоненты, 
// например преобразовывать необработанный указатель в совместимый тип.`let ptr = ptr as *mut u32;` с потерей отрицательных значений

// отдадим необработанный указатель обратно для освобождения занимаемой им памяти после выхода из области видимости (RAII)  
    Vec::from_raw_parts(ptr, len, cap)
    };
    assert_eq!(v_rebuilt, [-1, 0, 1]); 
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let v: Vec<i32> = vec![-1, 0, 1];
    let mut m = std::mem::ManuallyDrop::new(v); 
    let (ptr, len, cap) = (m.as_mut_ptr(),m.len(),m.capacity());

// Для корректно освобождения ресурсов:
// - или обратно преобразовать в Vec и тогда стандартный Drop отработает
    let v_rebuilt: Vec<i32> = unsafe { 
        Vec::from_raw_parts(ptr, len, cap)
    };
    assert_eq!(v_rebuilt, [-1, 0, 1]); 
// - либо вызвать освобождение ManuallyDrop::drop
    unsafe{
        ManuallyDrop::drop(&mut m);// ps. но не оба сразу способа `free(): double free detected in tcache 2`
    }
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut my_vec: Vec<i32> = vec![-1, 2, 3];
    let my_vec_ptr:*mut i32 = my_vec.as_mut_ptr();// получить необработанный указатель указателя на данные
   
    //let (my_vec_ptr, len, cap) = my_vec.into_raw_parts();// получить необработанный указатель указателя на данные, емкость и длину 
    let new_vec: Vec<i32> = unsafe{
        // можем мутировать данные
        for i in 0..len as i32 {
            std::ptr::write(my_vec_ptr.offset(i as isize), 4 + i);
        }
        // или так
        *my_vec_ptr.add(2) = 222_i32;
        // отдадим необработанный указатель обратно для освобождения занимаемой им памяти после выхода из области видимости (RAII)  
        Vec::from_raw_parts(my_vec_ptr, len,cap)
    };
    println!("new_vec = {:?}", new_vec);// [4, 5, 222]
    let my_vec_addr = my_vec_ptr as usize;// преобразовать необработанный указатель в целое число
    println!("address = {:X}", my_vec_addr);// 556BE0B489D0

}
</code></pre>




