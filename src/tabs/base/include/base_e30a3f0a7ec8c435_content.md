

Атрибут используется для выдачи диагностического предупреждения must_use, когда значение не используется.
```rust
#[must_use]
struct MustUse {
    // some fields
}
fn main(){
// Нарушает правило `unused_must_use`  
    MustUse::new();
}
```
