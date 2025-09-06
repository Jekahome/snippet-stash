

**rustdoc** -  для точечной генерации документации одного файла без Cargo. Парсит комментарии и генерирует HTML документацию.

```bash
# Базовое использование
rustdoc src/lib.rs

# С дополнительными опциями
rustdoc src/lib.rs --output-dir ./docs --crate-name my_crate

# Генерация для конкретного target
rustdoc --target x86_64-unknown-linux-gnu src/lib.rs
```
---

**cargo doc** - для управления документацией всего проекта в директории `target/docs`

```bash
# Базовая генерация
cargo doc

# С открытием в браузере
cargo doc --open

# Только для текущего крейта (без зависимостей)
cargo doc --no-deps

# Документация включая приватные items
cargo doc --document-private-items

# Для release версии
cargo doc --release
```

---

**rustup doc** - чтение локальной копии документации Rust

```bash
# Открывает стандартную библиотеку
rustup doc --std

# Документация по книге The Rust Programming Language
rustup doc --book

# Документация по Cargo
rustup doc --cargo

# Поиск конкретного topic
rustup doc --std | grep Vec

# Специфичная версия
rustup doc --toolchain nightly --std
```



