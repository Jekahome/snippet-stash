

Cargo имеет 4 встроенных профиля: dev, release, test, и bench . Профиль выбирается автоматически на основе выполняемой команды, если профиль не указан в командной строке.

Дефолтный `cargo build`:

```toml
[profile.dev]
opt-level = 0
debug = true
split-debuginfo = '...'  # Platform-specific.
debug-assertions = true
overflow-checks = true
lto = false
panic = 'unwind'
incremental = true
codegen-units = 256
rpath = false
```

Дефолтный `cargo build --release`:

```toml
[profile.release]
opt-level = 3
debug = false
split-debuginfo = '...'  # Platform-specific.
debug-assertions = false
overflow-checks = false
lto = false
panic = 'unwind'
incremental = false
codegen-units = 16
rpath = false
```
