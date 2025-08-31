

Запуск библиотеки на выполнение из папки bin/ как входной файл

Cargo.toml:

```toml
[package]
name = "HELLO"
```

src/lib.rs:
```
pub mod foo;
```

src/foo.rs:
```
pub const VAR:i32 = 9;
```

src/bin/backend.rs:
```
fn main() {
    println!("{}",HELLO::foo::VAR);
}
```

Запуск:
```
$ cargo run --bin backend
```

---

**Второй вариант через `[[bin]]`**

Cargo.toml:

```toml
[[bin]]
name = "name_run"
path = "src/bin/backend.rs"
```
Запуск:
```
$ cargo run --bin name_run
```

