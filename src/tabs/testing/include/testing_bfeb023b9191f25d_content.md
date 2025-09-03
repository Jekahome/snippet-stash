

Файл `Cargo.toml`:

```toml
[features]
dev = []
```

Файл тестов: `tests/e2e_test.rs`:

```
mod e2e;
  ...
let settings = e2e::get_settings()
```

Файл общих функции: `tests/e2e/mod.rs`:

```
pub fn get_settings()...
```

Запуск:

```
cargo test --features dev 
```
