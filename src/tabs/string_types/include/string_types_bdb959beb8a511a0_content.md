

Вызов C функции:
```rust
use std::ffi::{CString, CStr};
use std::os::raw::c_char;

// Предположим, что это внешняя C функция
extern "C" {
    fn strlen(s: *const c_char) -> usize;
    fn strcpy(dest: *mut c_char, src: *const c_char) -> *mut c_char;
}

fn main() {
    // Создаем C-совместимую строку
    let cstring = CString::new("Hello FFI").unwrap();
    
    unsafe {
        // Передаем в C функцию
        let length = strlen(cstring.as_ptr());
        println!("Длина строки: {}", length);
        
        // Копирование строки
        let mut buffer = vec![0u8; length + 1];
        let dest = buffer.as_mut_ptr() as *mut c_char;
        strcpy(dest, cstring.as_ptr());
        
        // Чтение результата
        let result = CStr::from_ptr(dest);
        println!("Скопировано: {:?}", result);
    }
}
```

Работа с не-UTF8 данными:

```rust
use std::ffi::{CString, CStr};

fn main() {
    // Строка с не-UTF8 последовательностью
    let bytes = vec![0x48, 0x65, 0x6C, 0x6C, 0x6F, 0x80, 0x81]; // "Hello" + invalid UTF-8
    
    let cstring = CString::new(bytes).unwrap();
    let cstr = cstring.as_c_str();
    
    // to_str() вернет ошибку
    if let Err(e) = cstr.to_str() {
        println!("Ошибка UTF-8: {}", e);
    }
    
    // to_string_lossy() работает всегда
    let lossy = cstr.to_string_lossy();
    println!("Lossy конверсия: {}", lossy); // "Hello��"
}
```

