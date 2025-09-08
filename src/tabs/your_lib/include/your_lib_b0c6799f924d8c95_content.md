

**1. Создание нового проекта**

В Rust есть два типа проектов: **бинарный** (`bin`) и **библиотечный** (`lib`). Для библиотеки:

```bash
cargo new my_library --lib
```

Структура будет примерно такой:

```
my_library/
├── Cargo.toml
└── src/
    └── lib.rs
```

---

**2. Файл `Cargo.toml`**

В нём указывается имя, версия и зависимости:

```toml
[package]
name = "my_library"
version = "0.1.0"
edition = "2021"

[dependencies]
```

---

**3. Точка входа для библиотеки — `src/lib.rs`**

Здесь ты определяешь публичный API:

```rust
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

pub mod utils {
    pub fn hello(name: &str) -> String {
        format!("Hello, {name}!")
    }
}
```

Всё, что надо сделать доступным пользователям, нужно объявить через `pub`.

---

**4. Тесты**

Rust поддерживает встроенные тесты:

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_add() {
        assert_eq!(add(2, 3), 5);
    }

    #[test]
    fn test_hello() {
        assert_eq!(utils::hello("Rust"), "Hello, Rust!");
    }
}
```

Запускаются так:

```bash
cargo test
```

---

**5. Документация**

Комментарии с `///` становятся документацией:

````rust
/// Складывает два числа
///
/// # Пример
/// ```
/// use my_library::add;
/// assert_eq!(add(2, 3), 5);
/// ```
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}
````

Документацию можно сгенерировать:

```bash
cargo doc --open
```

---

**6. Публикация**

Чтобы поделиться библиотекой:

1. Регистрация на [crates.io](https://crates.io).
2. В `Cargo.toml` добавить описание, лицензию, репозиторий и т. д.
3. Войти в аккаунт через cargo:

```bash
$ cargo login <твой-токен>
```

4. Публикация:

```bash
cargo publish
```
 
В итоге библиотека будет доступна другим через:

```toml
[dependencies]
my_library = "0.1"
```


