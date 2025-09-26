

```rust
use std::ffi::{CString, CStr};
use std::os::raw::c_char;
use std::ptr;

fn main() {
    // Создание массива C строк для передачи в C функцию
    let args = vec!["program_name", "--help", "-v"];
    
    // Конвертируем в CString
    let c_args: Vec<CString> = args.iter()
        .map(|&s| CString::new(s).unwrap())
        .collect();
    
    // Создаем массив указателей
    let mut c_ptrs: Vec<*const c_char> = c_args.iter()
        .map(|s| s.as_ptr())
        .collect();
    c_ptrs.push(ptr::null()); // NULL terminator для массива
    
    // Теперь c_ptrs можно передать в C функцию как char**
    println!("Массив содержит {} элементов", c_ptrs.len() - 1);
}
```
