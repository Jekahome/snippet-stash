

```rust
use std::ffi::{CString, CStr};

fn main() {
    // String -> CString
    let rust_string = String::from("Hello Rust");
    let cstring = CString::new(rust_string).unwrap();
    
    // CString -> String
    let back_to_string = cstring.to_string_lossy().into_owned();
    println!("{}", back_to_string);
    
    // &str -> CString
    let rust_str = "Hello World";
    let cstring_from_str = CString::new(rust_str).unwrap();
    
    // CStr -> &str
    let cstr = cstring_from_str.as_c_str();
    match cstr.to_str() {
        Ok(s) => println!("Valid UTF-8: {}", s),
        Err(_) => println!("Invalid UTF-8, используем lossy конверсию"),
    }
    
    // Lossy конверсия (для не-UTF8 данных)
    let lossy_str = cstr.to_string_lossy();
    println!("Lossy: {}", lossy_str);
}
```
