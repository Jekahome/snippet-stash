

Для библиотек

Следующие атрибуты используются для изменения того, как можно использовать тип.

Атрибут `non_exhaustive_`

Атрибут указывает, что в будущем к типу или варианту может быть добавлено больше полей или вариантов `non_exhaustive`
```rust
#[non_exhaustive]
pub enum Error {
    Message(String),
    Other,
}

pub enum Message {
    #[non_exhaustive] Send { from: u32, to: u32, contents: String },
    #[non_exhaustive] Reaction(u32),
    #[non_exhaustive] Quit,
}
fn main(){}
```
