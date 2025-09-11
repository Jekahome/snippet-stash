

```rust
use std::collections::hash_map::DefaultHasher;
use std::hash::Hasher;
fn main(){
   let mut hasher = DefaultHasher::new();
   let data = [0x01, 0x23, 0x45, 0x67, 0x89, 0xab, 0xcd, 0xef];

   hasher.write(&data);

   println!("Hash is {:x}!", hasher.finish());
}
```
