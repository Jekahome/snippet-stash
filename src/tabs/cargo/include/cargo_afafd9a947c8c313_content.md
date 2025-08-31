

Должна быть папка `examples/parse_select.rs` на уровне с `Cargo.toml`

```
cargo run --example parse_select
```

или

Псевдоним можно указать в `Cargo.toml`:

```toml
[[example]]
name = "parse"
path ="examples/parse_select.rs"
```

Запуск
```
cargo run --example parse
```
