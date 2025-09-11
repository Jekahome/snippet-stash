


```rust
 // Реэкспорт
 // Модификаторы доступа действуют на use.
 // Это можно использовать для реэкспорта
mod a{
    pub(crate) use b::Foo;
    mod b{
        pub(crate) struct Foo;;
    }
}

mod b{
    use super::a::Foo;
}
fn main(){}
```
