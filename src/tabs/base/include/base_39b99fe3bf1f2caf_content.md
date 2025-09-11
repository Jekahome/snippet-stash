

Функция into определяется довольно просто: она забирает self (нечто, реализующее Into) и возвращает значение типа T. 
Вот пример того, как это можно использовать:
```rust
struct Token {
    raw: String,
}
impl Token {
    // Создание нового токена
    //
    // Может принимать как &str так и String
    pub fn new<S>(raw: S) -> Token where S: Into<String>{ 
         // Поскольку стандартная библиотека уже предоставляет Into<String> для &str и String
         // существует обобщенная реализация Into для всех типов, которые реализуют типаж From
        Token { raw: raw.into() }
    }
}
fn main(){
   // &str
   let token = Token::new("abc123");

   // String
   let token = Token::new(secret_from_vault("api.example.io"));
}
```
