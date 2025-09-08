

**Пример проекта**

```
src/
 ├── lib.rs
 ├── parser.rs
 └── utils.rs
```

**File lib.rs:**

``` 
pub mod parser;
mod utils; // не делаем pub, чтобы utils не торчал наружу
```

**File parser.rs:**

``` 
use crate::utils;

pub fn parse(input: &str) {
    // можем использовать crate-функцию, хотя utils не pub
    let normalized = utils::normalize(input);
    println!("Parsing: {normalized}");
}
```

**File utils.rs:**

``` 
// Эта функция доступна везде внутри crate
pub(crate) fn normalize(input: &str) -> String {
    input.trim().to_lowercase()
}

// Эта функция приватна даже внутри crate
fn secret_helper() {
    println!("secret!");
}
```

---

**Использование**

Если мы соберём бинарник внутри того же проекта

**File main.rs:**
``` 
use my_library::parser;

fn main() {
    parser::parse("   Hello Rust!   ");
    // my_library::utils::normalize("..."); // ❌ Ошибка: не видно снаружи
}
```

**Что мы получили**

* `normalize` **виден во всех модулях crate** (например, `parser`, `network`, `storage` могут его звать).
* Но **не виден пользователю библиотеки**. То есть API остаётся чистым.

Это классический случай: **внутренний API для своих**, но не часть контракта с пользователем.

 
</code></pre>
