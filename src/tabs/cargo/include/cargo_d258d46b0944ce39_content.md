

```
# Установка

$ rustup component add rustfmt
$ rustup component add rustfmt --toolchain nightly

# Форматирование всех файлов
$ cargo fmt --all  
$ cargo fmt --all -- --check --color always 2>&1 | grep Diff -A 20| head -20
$ cargo +nightly fmt --all -- --check --unstable-features

# Вывод в stdout для предварительного просмотра
$ cargo +nightly fmt -- --emit stdout

# Форматирование отдельных файлов
$ cargo install rustfmt
$ rustfmt src/main.rs --check
$ rustfmt src/main.rs src/lib.rs
$ rustfmt --edition 2021 -- */*.rs

# Проверка вывода форматирования
$ echo "fn     main() {}" | rustfmt
```

---- 

`--check` покажет что будет форматировать

`--all` отформатируйте все пакеты, а также их локальные зависимости на основе пути
