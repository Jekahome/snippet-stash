


Пo lo..hi и lo.. можно итерироваться
```rust
fn main(){
 let bounded = 0..10;
 let from = 0..;
 let to = ..10;
 let full = ..;
 for i in (0..10).step_by(2) {
    println!("i = {}", i);
 }
}
```
