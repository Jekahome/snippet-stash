

```rust
fn main(){
    let s:&str = concat!("test", 10, 'b', true,44.88);
    assert_eq!(s, "test10btrue44.88");

    let one_plus_one = stringify!(1 + 1);
    assert_eq!(one_plus_one, "1 + 1");
}
```
