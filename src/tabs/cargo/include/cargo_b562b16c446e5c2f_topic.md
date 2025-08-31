

Реальные зависимости проекта

Cargo.toml

Cargo.lock

```
cargo tree --format "{p} {f}"
cargo tree -f '{p} {f}'

cargo build -v
cargo update
```

Указание синтаксиса зависимостей:
* [specifying-dependencies](https://rurust.github.io/cargo-docs-ru/specifying-dependencies.html)
* [reference/specifying-dependencies](https://doc.rust-lang.org/stable/cargo/reference/specifying-dependencies.html)
* [default-cargo-resolver](https://doc.rust-lang.org/edition-guide/rust-2021/default-cargo-resolver.html)
* [reference/resolver](https://doc.rust-lang.org/stable/cargo/reference/resolver.html)
