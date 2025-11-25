

```rust
use bincode;

let value: u32 = 42;
let encoded: Vec<u8> = bincode::serialize(&value).unwrap();
let decoded: u32 = bincode::deserialize(&encoded).unwrap();
```
