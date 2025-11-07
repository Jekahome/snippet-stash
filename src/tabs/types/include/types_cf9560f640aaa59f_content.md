

В Rust мы не можем напрямую менять чужие типы (из std или crate’ов), но можем добавить им новые методы через трейты, которые реализуешь локально.

Пример для ситуации: наш трейт + чужой тип (crates или из std)

Мы “добавим” метод к чужому типу (String), не изменяя его исходник.

```rust
// Расширяем стандартный тип String
trait StringUtils {
    fn is_palindrome(&self) -> bool;
}

// Реализация для String
impl StringUtils for String {
    fn is_palindrome(&self) -> bool {
        let s = self.chars().collect::<Vec<_>>();
        s == s.iter().rev().cloned().collect::<Vec<_>>()
    }
}

fn main() {
    let s = "racecar".to_string();
    println!("{}", s.is_palindrome()); // true
}
```

Или расширим `Vec<i32>`:

```rust
trait VecExt {
    fn sum_squares(&self) -> i32;
}

impl VecExt for Vec<i32> {
    fn sum_squares(&self) -> i32 {
        self.iter().map(|x| x * x).sum()
    }
}
 
fn main() {
    let buff:Vec<i32> = vec!(1,2,3);
    println!("{}", buff.sum_squares()); // 14
}
```

Пример для ситуации: чужой трейт `fmt::Display` + наш тип `MyType`:

```rust
use std::fmt;

struct MyType;

impl fmt::Display for MyType {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "MyType")
    }
}

```


Когда это полезно:
- Когда тебе нужно удобное API к стандартному типу (String, Vec, Path, Option, и т.д.).
- Когда ты не можешь (или не хочешь) наследовать или оборачивать тип.
- Когда это локальное расширение — не часть публичного контракта библиотеки.

---

Но в Rust действует **orphan rule**:

Мы можем реализовать трейты только если **тип или трейт определён в нашем crate’е**.
- ✅ можно: наш трейт + чужой тип (crates или из std)
- ✅ можно: чужой трейт + наш тип
- ❌ нельзя: чужой трейт + чужой тип




