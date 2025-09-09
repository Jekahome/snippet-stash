

```rust
fn main(){
  fn plus_one(i:i32)->i32{
      i+1
  }
    
  let my_f:fn(i32)->i32 = plus_one;
  println!("my_f = {:p}", my_f);// my_f = 0x55c21df2db60

  let six = my_f(5);
  println!("{}",six);
}
```
