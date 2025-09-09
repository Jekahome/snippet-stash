



```rust
fn add_four<T: std::borrow::Borrow<i32>>(v: T) -> i32 {
    v.borrow() + 4
}
fn main(){
    assert_eq!(add_four(&2), 6);
    assert_eq!(add_four(2), 6);
}
```
