

```
Атрибуту  #[cfg(...)], который указывается на месте атрибута
Макросу  cfg!(...), который можно использовать в условных выражениях
```

---
 
```rust
// Эта функция будет скомпилирована только в том случае, если целевая ОС будет linux
#[cfg(target_os = "linux")]
fn are_you_on_linux() {
    println!("Вы работаете в linux!");
}

// А эта функция будет скомпилирована, если целевая ОС *не* linux
#[cfg(not(target_os = "linux"))]
fn are_you_on_linux() {
    println!("Вы работаете *не* в linux!");
}

fn main() {
    are_you_on_linux();
    
    println!("Вы уверены?");
    if cfg!(target_os = "linux") {
        println!("Да. Это точно linux!");
    } else {
        println!("Да. Это точно *не* linux!");
    }
}
```
