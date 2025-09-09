

```rust
// подходит для `&mut T` и `&T` и `T` и `mut T`
use std::borrow::Borrow;
use std::fmt::Debug;

fn generic_borrow<T: Borrow<str> + Debug>(value: T) {
    println!("{:?}", value.borrow());   
}

fn main() {
    let s = String::from("Привет");
    generic_borrow(s.clone());          // String
    generic_borrow(&s);                 // &String
    generic_borrow(&mut s.clone());     // &mut String
    generic_borrow("Привет");           // &str
}
```
