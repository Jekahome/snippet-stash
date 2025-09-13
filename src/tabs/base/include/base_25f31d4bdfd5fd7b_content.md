

```rust
 fn first_name(&self) -> Option<&str> {
        match self.first_name {
            Some(ref v) => Some(v.as_str()),
            None => None,
        }
    }

// Rust 2018, напротив, будет выводить &s и refs, а ваш оригинальный код будет просто работать.

 fn first_name(&self) -> Option<&str> {
        match &self.first_name {
            Some(v) => Some(v.as_str()),
            None => None,
        }
}
fn main(){}
```
