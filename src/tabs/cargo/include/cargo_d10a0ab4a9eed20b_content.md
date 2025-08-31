

Если надо запустить `main.rs` то в опции `--bin` указать имя проекта (из Cargo.toml)

Для проверки работы библиотеки:
- создать папку `src/bin/example_bin.rs`
- импортировать свою библиотеку `use self::your_lib_name::*;`
- запуск `cargo run --bin example_bin`
