

```rust
struct S{
    x:u8,
    y:u8
}
fn main() {
    let obj:S = S{x:9u8,y:3u8};
    f(obj);
}
fn f( S { x,y }: S){
    println!("S=({},{})",x,y);
}
```
