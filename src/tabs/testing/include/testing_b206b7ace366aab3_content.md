

Каждый файл Rust в examples/(или каждый подкаталог в examples/, который включает main.rs) может быть запущен как автономный двоичный файл с 

```
$ cargo run --example <name> 
$ cargo run --example <name> -- arg1 arg2
или 
$ cargo test --example <name>
```

Эти программы имеют доступ только к публичному API вашего ящика и предназначены для иллюстрации использования вашего API в целом. Примеры не обозначены специально как тестовый код (нет `#[test]`, нет `#[cfg(test)]`), и они являются плохим местом для размещения кода, который проверяет скрытые уголки и щели вашего ящика, особенно потому, что примеры не запускаются cargo test по умолчанию.

Запуск тестов из папки examples. (При запуске `$ cargo test` папка `/examples` не просматривается)

```
cargo test --examples
```

Для запуска тестов из папки examples при вызове  `$ cargo test` следует расшарить папку examples в папку интеграционных тестов

```
#[path = "../examples"]
mod examples {
   mod check_lib;
}
```

**Так же можно задать пути к тестам через Cargo.toml**:

```toml
[[example]]
name = "my_test"
path = "examples/file.rs"
required-features = ["some_feature"]  # если нужны определенные фичи
```

Запуск:
```
cargo run --example my_test --features "some_feature"
```

