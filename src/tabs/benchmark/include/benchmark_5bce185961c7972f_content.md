

```
cargo install cargo-wizard

$ cargo wizard apply <template> <profile>
# For example, apply `fast-runtime` template to the `dist` profile
$ cargo wizard apply fast-runtime dist

Changed Cargo.toml:
[profile.dist]
inherits = "release"
opt-level = 3
debug = false
strip = "none"
lto = true
codegen-units = 1
incremental = false
panic = "abort"
```

**fast-compile** - минимизирует время компиляции
Отключает генерацию отладочной информации и использует более быстрый компоновщик.
В ночном режиме он также включает бэкэнд кодегенерации Cranelift и параллельный фронтэнд.

**fast-runtime** - максимизирует производительность во время выполнения
Включает LTO и другие настройки, предназначенные для максимизации производительности во время выполнения.

**min-size** - минимизирует размер двоичного файла
Аналогично fast-runtime, но использует флаги оптимизации, предназначенные для небольшого размера двоичного файла.
