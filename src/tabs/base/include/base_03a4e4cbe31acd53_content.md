

```rust
fn bare(x: &i32) -> i32 { 2 * *x }
let generic: Box<dyn for<'a> Fn(&'a i32) -> i32> = Box::new(bare);

fn bare2(x: i32) -> i32 { 2 * x }
let generic: Box<dyn Fn(i32) -> i32> = Box::new(bare2);

fn bare3(x: Box<i32>) -> i32 { 2 }
let generic: Box<dyn Fn(Box<i32>) -> i32> = Box::new(bare3);

fn bare4(x: Box<dyn std::any::Any + Send + 'static>) -> i32 { 2 }
let generic: Box<dyn Fn(Box<dyn std::any::Any + Send + 'static>) -> i32> = Box::new(bare4);
fn main(){}
```
