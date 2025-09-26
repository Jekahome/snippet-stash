

```rust
use std::ffi::CString;

fn main() {
    // Из &str (проверяет на нулевые байты)
    let cstring1 = CString::new("Hello World").unwrap();
    
    // Из Vec<u8> (также проверяет на нулевые байты)
    let bytes = vec![72, 101, 108, 108, 111]; // "Hello"
    let cstring2 = CString::new(bytes).unwrap();
    
    // Использование with_capacity
    let mut cstring3 = CString::new("Hello").unwrap();
    
    // Добавление в конец
    cstring3.push_bytes(b" World");
}
```

Ошибки при создании:

```rust
use std::ffi::CString;

fn main() {
    // Ошибка: строка содержит нулевой байт
    match CString::new("Hello\0World") {
        Ok(s) => println!("Успех: {:?}", s),
        Err(e) => println!("Ошибка: {}", e), // Сработает это
    }
    
    // Правильно - экранирование нулевого байта
    let bytes = b"Hello\0World".to_vec();
    let cstring = CString::new(bytes).unwrap();
}
```
