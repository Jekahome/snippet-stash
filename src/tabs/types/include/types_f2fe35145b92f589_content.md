

**1. Указатель -> Указатель (Pointer -> Pointer)**
<pre><code class="language-rust">
fn main(){
// Это преобразование меняет тип данных, на который указывает указатель, не изменяя его адреса. Это полезно, когда вы работаете с сырой памятью.
    let mut num = 10;
    let ptr_i32: *mut i32 = &mut num;
    // Безопасное преобразование *mut i32 в *mut u8
    let ptr_u8: *mut u8 = ptr_i32 as *mut u8;

    println!("Адрес num как i32: {:p}", ptr_i32);
    println!("Адрес num как u8:  {:p}", ptr_u8);
    // Адреса одинаковы, но теперь мы можем работать с памятью побайтно
}
</code></pre>

**2. Указатель -> Целое число (Pointer -> Integer)**
<pre><code class="language-rust">
fn main(){
// Это преобразование позволяет получить числовое представление адреса, на который указывает указатель. Тип usize гарантированно имеет достаточный размер, чтобы вместить любой указатель.
    let num = 100;
    let ptr: *const i32 = &num as *const i32;
    // Безопасное преобразование указателя в usize
    let address: usize = ptr as usize;

    println!("Адрес num в виде указателя: {:p}", ptr);
    println!("Адрес num в виде числа:    {}", address);
}
</code></pre>

**3. Перечисление без полей -> Целое число (enum w/o fields -> Integer)**
<pre><code class="language-rust">
// Это преобразование безопасно, так как каждому варианту перечисления без полей по умолчанию присваивается целочисленное значение, начиная с нуля.
#[derive(Debug)]
enum Status {
    Pending,
    Active,
    Completed,
}
fn main() {
    let status = Status::Completed;
    // Безопасное преобразование варианта Completed в его числовое представление
    let status_val = status as u8;

    println!("Значение `Status::Completed` как число: {}", status_val);
    assert_eq!(status_val, 2); // Pending=0, Active=1, Completed=2
}
</code></pre>

**4. bool -> Целое число (bool -> Integer)**
<pre><code class="language-rust">
fn main(){
// Преобразование логических значений в целые числа всегда безопасно, поскольку true всегда соответствует 1, а false — 0.
    let is_ok = true;
    let is_error = false;
    
    // Безопасное преобразование bool в i8
    let ok_val = is_ok as i8;
    let error_val = is_error as i8;

    println!("`true` как i8: {}", ok_val);
    println!("`false` как i8: {}", error_val);
    assert_eq!(ok_val, 1);
    assert_eq!(error_val, 0);
}
</code></pre>

**5. char -> Целое число (char -> Integer)**
<pre><code class="language-rust">
fn main(){
// В Rust char является 4-байтовым типом, представляющим символ Unicode (от U+0000 до U+D7FF и от U+E000 до U+10FFFF). Его можно безопасно преобразовать в целочисленный тип, который может вместить кодовую точку, например, u32.
    let ch = 'A';
    // Безопасное преобразование символа в его кодовую точку u32
    let char_code = ch as u32;

    println!("Символ '{}' как u32: {}", ch, char_code);
    assert_eq!(char_code, 65); // Кодовая точка ASCII для 'A'
}
</code></pre>
