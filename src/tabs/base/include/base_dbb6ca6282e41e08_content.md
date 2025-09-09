

```rust
fn main(){
 loop {
    match option {
        Some(x) => println!("{}", x),
        _ => break,
    }
 }
}
```

`loop` превращается в такой `while`:
```rust
fn main(){
 while let Some(x) = option {
    println!("{}", x);
 }
}
```
