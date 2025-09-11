


```rust
fn main(){
   {
       const c:i32 =9;
       static s:i32 =8;
   }
   // cannot find value `c` in this scope
   //cannot find value `s` in this scope
   print!("{}{}",c,s);
}
```
