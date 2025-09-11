


```rust
use std::mem;
fn main(){
   let mut v: Vec<i32> = vec![1, 2];

   let old_v = mem::replace(&mut v, vec![3, 4, 5]);
   assert_eq!(2, old_v.len());
   assert_eq!(3, v.len());
}
```
