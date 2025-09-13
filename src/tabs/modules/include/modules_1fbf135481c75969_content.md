

**Ситуация**

Представь, у нас есть модуль `parser`, а внутри него — модуль `lexer`.
`lexer` нужен только как **внутренний помощник** для `parser`, и мы не хотим, чтобы его API было доступно во всём crate.


**Структура проекта**

```
src/
 ├── lib.rs
 └── parser/
      ├── mod.rs   (или parser.rs)
      └── lexer.rs

```


**File lib.rs:**

```
pub mod parser;
```


**File parser/mod.rs:**

```
mod lexer;

pub fn parse(input: &str) {
    // можем использовать pub(super) функцию из lexer
    let tokens = lexer::tokenize(input);
    println!("Tokens: {:?}", tokens);
}
```

**File parser/lexer.rs:**

```
// Эта функция доступна только для родителя (parser), но не для всего crate
pub(super) fn tokenize(input: &str) -> Vec<&str> {
    input.split_whitespace().collect()
}
```

**Использование**

**File main.rs**
```
use my_library::parser;

fn main() {
    parser::parse("hello rust");
    // my_library::parser::lexer::tokenize("test"); 
    // ❌ Ошибка: tokenize = pub(super), а не pub
}
```

**Что получилось**

* `tokenize` доступен **только из `parser`**, потому что у него `pub(super)`.
* Если бы было `pub(crate)`, `tokenize` можно было бы вызвать **из любого модуля** внутри библиотеки.
* Если бы было `pub`, то и пользователи библиотеки снаружи могли бы напрямую вызывать `lexer::tokenize`.

Таким образом `pub(super)` — это способ **спрятать внутреннюю реализацию за фасадом модуля**.

