

Создание и использование CStr:

```rust
use std::ffi::{CStr, CString};

fn main() {
    // Создаем CString
    let cstring = CString::new("Hello Rust").unwrap();
    
    // Получаем CStr ссылку
    let cstr: &CStr = cstring.as_c_str();
    
    // Из сырого указателя (unsafe)
    let ptr = cstring.as_ptr();
    unsafe {
        let cstr_from_ptr = CStr::from_ptr(ptr);
        println!("Из указателя: {:?}", cstr_from_ptr);
    }
    
    // Из байт с нулем в конце
    let bytes_with_nul = b"Hello\0";
    let cstr_from_bytes = CStr::from_bytes_with_nul(bytes_with_nul).unwrap();
    println!("Из байт: {:?}", cstr_from_bytes);
}
```
