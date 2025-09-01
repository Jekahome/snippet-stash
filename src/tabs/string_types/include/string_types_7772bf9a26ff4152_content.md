

**Методы для проверки символа**

  - **is_alphabetic()**: Проверяет, является ли символ буквой.
  - **is_alphanumeric()**: Проверяет, является ли символ буквой или цифрой.
  - **is_ascii()**: Проверяет, находится ли символ в диапазоне ASCII (от 0 до 127).
  - **is_control()**: Проверяет, является ли символ управляющим символом Unicode (например, табуляция, перевод строки).
  - **is_digit(radix: u32)**: Проверяет, является ли символ цифрой в указанной системе счисления (от 2 до 36).
  - **is_lowercase()**: Проверяет, является ли символ буквой в нижнем регистре.
  - **is_uppercase()**: Проверяет, является ли символ буквой в верхнем регистре.
  - **is_whitespace()**: Проверяет, является ли символ пробелом, табуляцией, переводом строки и другими символами-разделителями.

**Методы для преобразования регистра**

  - **to_lowercase()**: Возвращает итератор, который преобразует символ в нижний регистр. Может возвращать несколько символов, если преобразование приводит к расширению (например, `Ş` -\> `s` и `s`).
  - **to_uppercase()**: Возвращает итератор, который преобразует символ в верхний регистр.
  - **to_ascii_lowercase()**: Преобразует символ в нижний регистр **только** если он является ASCII-буквой. Возвращает сам символ, если он не ASCII-буква.
  - **to_ascii_uppercase()**: Преобразует символ в верхний регистр **только** если он является ASCII-буквой.

**Дополнительные методы**

  - **len_utf8()**: Возвращает количество байтов, необходимое для кодирования символа в UTF-8.
  - **len_utf16()**: Возвращает количество 16-битных кодовых единиц (surrogates), необходимое для кодирования символа в UTF-16.
  - **escape_unicode()**: Возвращает итератор, который генерирует строковое представление символа в виде Unicode-экранированной последовательности.
 
<pre><code class="language-rust">
fn main() {
    let c1 = 'a';
    let c2 = 'B';
    let c3 = '8';
    let c4 = ' ';

    println!("{} is alphabetic: {}", c1, c1.is_alphabetic());
    println!("{} is lowercase: {}", c2, c2.is_lowercase());
    println!("{} is a digit (base 10): {}", c3, c3.is_digit(10));
    println!("{} is whitespace: {}", c4, c4.is_whitespace());
    
    let upper_case_c1: String = c1.to_uppercase().collect();
    println!("{} to uppercase is: {}", c1, upper_case_c1);
    
    let lower_case_c2: String = c2.to_lowercase().collect();
    println!("{} to lowercase is: {}", c2, lower_case_c2);
    
    let a_byte_len = 'a'.len_utf8();
    let cyrillic_byte_len = 'Я'.len_utf8();
    println!("'a' takes {} byte(s)", a_byte_len);
    println!("'Я' takes {} byte(s)", cyrillic_byte_len);

    let unicode_escape = '⌘'.escape_unicode();
    println!("'⌘' escaped: {}", unicode_escape);

    assert_eq!('β'.is_alphabetic(), true);
    assert_eq!('8'.to_digit(10), Some(8));
    assert_eq!('ಠ'.len_utf8(), 3);
    assert_eq!(std::char::from_digit(2, 10), Some('2'));
}
</code></pre>
