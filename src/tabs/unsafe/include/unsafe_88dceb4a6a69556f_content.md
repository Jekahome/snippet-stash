

<pre><code class="language-rust">
fn main(){
    let raw_ptr = &pointee как *const type // создать постоянный необработанный указатель на некоторые данные
    let raw_mut_ptr = &mut pointee как *mut type // создать изменяемый необработанный указатель на некоторые изменчивые данные
    let deref = *raw_ptr // разыменовать необработанный указатель (требуется небезопасный блок)
}
</code></pre>

---

Создание и использование постоянных исходных указателей
<pre><code class="language-rust">
fn main(){
    // Возьмем произвольный фрагмент данных, в данном случае 4-байтовое целое число
    let some_data: u32 = 14;

    // Создайте постоянный необработанный указатель, указывающий на данные выше
    let data_ptr: *const u32 = &some_data as *const u32;

    // Примечание: создание необработанного указателя полностью безопасно, но для разыменования необработанного указателя требуется небезопасный блок
    unsafe {
        let deref_data: u32 = *data_ptr;
        println!("Dereferenced data: {}", deref_data);
    }
}
</code></pre>

---

Создание и использование изменяемых исходных указателей
<pre><code class="language-rust">
fn main(){

    // Возьмем изменяемый фрагмент данных, в данном случае 4-байтовое целое число.
    let mut some_data: u32 = 14;

    // Создайте изменяемый необработанный указатель, указывающий на данные выше
    let data_ptr: *mut u32 = &mut some_data as *mut u32;

    // Примечание: создание необработанного указателя полностью безопасно, но для разыменования необработанного указателя требуется unsafe block
    unsafe {
        *data_ptr = 20;
        println!("Dereferenced data: {}", some_data);
    }
}
</code></pre>

---

Инициализация исходного указателя на нулевой.
В отличие от обычных ссылок Rust, raw-указатели могут принимать нулевые значения.
<pre><code class="language-rust">
use std::ptr;
fn main(){
    // Create a const NULL pointer
    let null_ptr: *const u16 = ptr::null();

    // Create a mutable NULL pointer
    let mut_null_ptr: *mut u16 = ptr::null_mut();

    Цепной разыменования
    Как и в C, Rust raw указатели могут указывать на другие необработанные указатели (которые, в свою очередь, могут указывать на дополнительные raw-указатели).

    // Возьмите обычный slice string 
    let planet: &str = "Earth";

    // Создайте постоянный указатель, указывающий на наш string slice
    let planet_ptr: *const &str = &planet as *const &str;

    // Создайте постоянный указатель, указывающий на указатель
    let planet_ptr_ptr: *const *const &str = &planet_ptr as *const *const &str;

    // Это может продолжаться ...
    let planet_ptr_ptr_ptr = &planet_ptr_ptr as *const *const *const &str;

    unsafe {
        // Direct usage
        println!("The name of our planet is: {}", planet);
        // Single dereference
        println!("The name of our planet is: {}", *planet_ptr);
        // Double dereference
        println!("The name of our planet is: {}", **planet_ptr_ptr);
        // Triple dereference
        println!("The name of our planet is: {}", ***planet_ptr_ptr_ptr);
    }
}
</code></pre>

---

Отображение исходных указателей.
У Rust есть форматирование по умолчанию для типов указателей, которые могут использоваться для отображения указателей.
<pre><code class="language-rust">
use std::ptr;
fn main(){
// Создайте некоторые данные, необработанный указатель, указывающий на них, и нулевой указател
    let data: u32 = 42;
    let raw_ptr = &data as *const u32;
    let null_ptr = ptr::null() as *const u32;

//  {: p} показывает значения указателей как шестнадцатеричные адреса памяти
    println!("Data address: {:p}", &data);
    println!("Raw pointer address: {:p}", raw_ptr); 
    println!("Null pointer address: {:p}", null_ptr);

// Это выведет что-то вроде этого:
// Data address: 0x7fff59f6bcc0
// Raw pointer address: 0x7fff59f6bcc0
// Null pointer address: 0x0
}
</code></pre>

