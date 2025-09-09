


```rust
fn main() {
    let say_hi = { 
        let name_outer = String::from("Alice");
        /*
        // не работает, так как замыкание переживает захваченные значения
        || {
            // use by ref
            let name_inner = &name_outer;
            println!("Hello, {}", name_inner);
        }
        */
        // работает
        move || {
            let name_inner = &name_outer;
            println!("Hello, {}", name_inner);
        }
    };
    say_hi();
    say_hi();
}
```
