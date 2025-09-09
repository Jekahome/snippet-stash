

```rust
fn main(){
   let res:Result<i32,std::io::Error> =  (|| { Ok(1) })();
   println!("{:?}",res);
}
```
