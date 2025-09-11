

```rust
enum Kind { A,  B,  C}

impl std::default::Default for Kind {
     fn default() -> Kind { Kind::A }
}
fn main(){
   let k: i8 = std::default::Default::default();
   println!("{:?}",k);// 0 так как в enum первый элемент это 0
}
```

--- 

```rust
#[derive(Default)]
enum Kind {
    #[default]
    A,
    B,
    C,
}
fn main(){}
```
