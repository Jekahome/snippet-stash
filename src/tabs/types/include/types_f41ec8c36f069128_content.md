

**`wrapping_*`**

`wrapping_*` методы выполняют арифметические операции, которые "оборачиваются" в случае переполнения. Это означает, что если результат превышает максимальное значение для типа, он начинается с минимального значения (и наоборот).
<pre><code class="language-rust">
fn main() {
    let a: u8 = 250;
    let b: u8 = 10;
    // 250 + 10 = 260. 260 - 256 (максимум + 1) = 4
    let sum_wrapped = a.wrapping_add(b);
    println!("Результат wrapping_add: {}", sum_wrapped);
    assert_eq!(sum_wrapped, 4);

    let x: i8 = 120;
    let y: i8 = 10;
    // 120 + 10 = 130. 130 - 256 (переполнение) = -126
    let sum_wrapped_signed = x.wrapping_add(y);
    println!("Результат wrapping_add (знаковое): {}", sum_wrapped_signed);
    assert_eq!(sum_wrapped_signed, -126);
}
</code></pre>

-----

**`checked_*`**

`checked_*` методы возвращают `Option<T>`, где `Some(T)` содержит результат, если переполнения не было, и `None`, если оно произошло. Это позволяет вам явно обрабатывать ошибки переполнения.
<pre><code class="language-rust">
fn main() {
    let a: u8 = 250;
    let b: u8 = 10;
    let sum_checked = a.checked_add(b);

    if let Some(sum) = sum_checked {
        println!("Сложение успешно, результат: {}", sum);
    } else {
        println!("Переполнение: 250 + 10 превышает u8");
    }
    assert_eq!(sum_checked, None);

    let x: u8 = 10;
    let y: u8 = 5;
    let sum_checked_ok = x.checked_add(y);
    assert_eq!(sum_checked_ok, Some(15));
}
</code></pre>

-----

**`overflowing_*`**

`overflowing_*` методы возвращают кортеж `(T, bool)`. Первый элемент — это результат операции (который может быть переполнен), а второй — логическое значение, указывающее, произошло ли переполнение.
<pre><code class="language-rust">
fn main() {
    let a: u8 = 250;
    let b: u8 = 10;
    let (sum_val, did_overflow) = a.overflowing_add(b);

    println!("Результат overflowing_add: {}", sum_val);
    println!("Было переполнение: {}", did_overflow);
    assert_eq!(sum_val, 4);
    assert_eq!(did_overflow, true);

    let x: u8 = 10;
    let y: u8 = 5;
    let (sum_val_ok, did_overflow_ok) = x.overflowing_add(y);
    assert_eq!(sum_val_ok, 15);
    assert_eq!(did_overflow_ok, false);
}
</code></pre>

-----

**`saturating_*`**

`saturating_*` методы выполняют арифметические операции с **насыщением**. Если результат превышает максимальное значение для типа, он "насыщается" до этого максимума. Если он становится меньше минимума, он насыщается до минимума.
<pre><code class="language-rust">
fn main() {
    let a: u8 = 250;
    let b: u8 = 10;
    let sum_saturated = a.saturating_add(b);

    println!("Результат saturating_add: {}", sum_saturated);
    assert_eq!(sum_saturated, 255); // u8::MAX

    let x: i8 = -100;
    let y: i8 = -50;
    let sum_saturated_signed = x.saturating_add(y);
    
    println!("Результат saturating_add (знаковое): {}", sum_saturated_signed);
    assert_eq!(sum_saturated_signed, -128); // i8::MIN
}
</code></pre>
 

