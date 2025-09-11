

Обратите внимание, что `derive` стратегия требует, чтобы все поля были `Eq`, что не всегда желательно.
```rust
enum BookFormat { Paperback, Hardback, Ebook }
struct Book {
    isbn: i32,
    format: BookFormat,
}
impl PartialEq for Book {
    fn eq(&self, other: &Self) -> bool {
        self.isbn == other.isbn
    }
}
impl Eq for Book {}
fn main(){}
```
