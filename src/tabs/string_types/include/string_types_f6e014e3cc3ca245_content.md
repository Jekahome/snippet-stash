

```rust
use std::ffi::{CString, CStr};
use std::os::raw::c_char;

// Безопасная обертка вокруг C функции
fn safe_strlen(s: &str) -> Result<usize, std::ffi::NulError> {
    let c_string = CString::new(s)?;
    
    unsafe {
        Ok(unsafe_strlen(c_string.as_ptr()))
    }
}

// Небезопасная внешняя функция
extern "C" {
    fn unsafe_strlen(s: *const c_char) -> usize;
}

// Функция для получения строки из C
unsafe fn get_string_from_c(ptr: *const c_char) -> Option<String> {
    if ptr.is_null() {
        return None;
    }
    
    let c_str = CStr::from_ptr(ptr);
    c_str.to_str().ok().map(|s| s.to_owned())
}

fn main() {
    // Безопасное использование
    match safe_strlen("Hello World") {
        Ok(len) => println!("Длина: {}", len),
        Err(e) => println!("Ошибка: {}", e),
    }
}
```
