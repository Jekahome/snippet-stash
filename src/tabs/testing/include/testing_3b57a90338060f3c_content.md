

Файл `ex/src/lib.rs`:
<pre><code class="language-rust">
/// First line is a short summary describing function.
///
/// The next lines present detailed documentation. Code blocks start with
/// triple backquotes and have implicit `fn main()` inside
/// and `extern crate <cratename>`. Assume we're testing `ex` crate:
///
/// &#96;&#96;&#96;rust
/// extern crate ex;
/// use ex::{add};
///
/// let result = ex::add(2, 3);
/// assert_eq!(result, 5);
/// &#96;&#96;&#96;
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}
</code></pre>

Запуск:
```
$ cargo test --doc
```

При ошибке исполнения: Couldn't run the test: Permission denied (os error 13) - maybe your tempdir is mounted with noexec?
Нужно перемонтировать папку.
```
$ sudo mount -o remount,exec /tmp
```

---

Тесты в документации **уровня модуля**  //! (код в документации проходит тесты) работает только с библиотеками
<pre><code class="language-rust">
в модуле  /phrases/src/english/mod.rs
//! Контейнер `adder` предоставляет функции сложения чисел.
//!
//! # Examples
//!
//! &#96;&#96;&#96;rust
//!  assert_eq!("Hello!".to_string(),  phrases::english::greetings::hello())
//! &#96;&#96;&#96;
pub mod greetings;

pub mod farewells;
</code></pre>

---

Тесты в документации **уровня функции** /// (код в документации проходит тесты) работает только с библиотеками
 
<pre><code class="language-rust">
В файле модуля  phrases/src/english/greetings.rs
/// Эта функция прибавляет 2 к своему аргументу.
///
/// # Examples
///
/// &#96;&#96;&#96;rust
/// use phrases::english::greetings::hello;
///
/// assert_eq!("Hello1".to_string(),  hello());
/// &#96;&#96;&#96;
pub fn hello() -> String {
    "Hello!".to_string()
}
</code></pre>

---

Игнорировать выполнение тестов в документации, добавить слово "text" к блоку кода
<pre><code class="language-rust">
/// &#96;&#96;&#96;text
/// fn foo() {
///    ...
/// }
/// &#96;&#96;&#96;

</code></pre>


