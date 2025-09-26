

Так как &str это ссылка на валидную UTF-8 строку, то любые способы создания &str 
из набора байт являются unsafe либо safe метод с проверкой from_utf8
При этом аллокации нет, просто теперь эта последовательность байт проверенна и является валидной UTF-8 строкой
 
```rust
const BYTES: [u8; 11] = [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100];

fn main() {
    // unsafe метод - без проверки на валидность UTF-8
    // std::str::from_utf8_unchecked() - unsafe метод без проверки
    let text: &str = unsafe {
        std::str::from_utf8_unchecked(&BYTES)
    };
    assert_eq!(text, "Hello World");

    // Использование указателей (более низкоуровневый подход)
    let text: &str = unsafe {
        let ptr = &BYTES as *const u8;
        let slice = std::slice::from_raw_parts(ptr, BYTES.len());
        std::str::from_utf8_unchecked(slice)
    };
    assert_eq!(text, "Hello World");
    
    // safe метод - с проверкой на валидность UTF-8
    // std::str::from_utf8() - безопасный метод с проверкой
    let text: &str = std::str::from_utf8(&BYTES).unwrap();
    assert_eq!(text, "Hello World");
}

//std::str::from_utf8_mut() - для mutable байт
//std::str::from_utf8_mut_unchecked() - unsafe mutable вариант
```
