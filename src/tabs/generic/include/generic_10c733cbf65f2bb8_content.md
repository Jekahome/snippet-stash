

```rust
#![feature(try_trait_v2)]
use std::ops::Try;
fn simple<T: Copy, R: Try<Output = T>>(value:T) -> (impl Try<Output = T>,impl Try<Output = T>){
     (Some(value),Ok::<T,Box<dyn std::error::Error>>(value))
}
fn main(){}
```
