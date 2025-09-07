

cargo-udeps поможет вам обнаружить неиспользуемые зависимости:

`$ cargo install cargo-udeps`

Run:
```
$ cargo +nightly udeps --all-targets
```

Добавление исключений для cargo-udeps

Если cargo-udeps все еще находит ложные срабатывания, вы можете настроить Cargo.toml, чтобы игнорировать некоторые зависимости:

Cargo.toml:
```toml
[package.metadata.cargo-udeps.ignore]
dependencies = ["anyhow", "tokio-stream"]
```
