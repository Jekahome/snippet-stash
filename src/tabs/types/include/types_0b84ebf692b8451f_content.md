

Целочисленные значения так же могут быть выражены с помощью префиксов
* шестнадцатеричного `0x`
* восьмеричного `0o` 
* двоичного `0b`

Для улучшения читаемости числовых литералов можно использовать подчёркивания:
* `1_000 тоже самое, что и 1000`
* `0.000_001 тоже самое, что и 0.000001`

```
Decimal    98_222
Hex           0xff
Octal         0o77
Binary       0b1111_0000
Byte (u8 only)        b'A'
```

<pre><code class="language-rust">
fn main(){
 let hex_octal_bin = 0xffff_ffff + 0o777 + 0b1;
 let byte:u8 = b'a';
 assert_eq!(byte,65);
}
</code></pre>

---
Литералы — целое число + суффикс:
<pre><code class="language-rust">
fn main(){
    let y = 92_000_000i64;
    let hex_octal_bin = 0xffff_ffff + 0o777 + 0b1;// 16 + 8 +2 ричные системы счисления
    let byte: u8 = b'a'; // b' - ASCII кодировка. Код символа
    assert_eq!(byte, 65);

// Литералы с суффиксами. Их тип известен при инициализации.
    let x = 1u8;
    let y = 2u32;
    let z = 3f32;

// Литералы без суффиксов. Их тип будет зависеть от того, как их используют.
    let x = 1;
    let y = 1;

    let x2:i8 = x;
    let y2:i32 = y;
    assert_eq!(1, std::mem::size_of_val(&x)); 
    assert_eq!(4, std::mem::size_of_val(&y));
}
</code></pre>

 
