

Рабочее пространство является набором пакетов, которые совместно используют один и тот же файл Cargo.lock и папку target для хранения конечных программных продуктов (будь то бинарные файлы или библиотеки)

```toml
[workspace]

members = [
    "adder",
    "add-one",
]
```

```

$ tree .
```

```

├── Cargo.lock
├── Cargo.toml
├── add-one
│   ├── Cargo.toml
│   └── src
│       └── lib.rs
├── adder
│   ├── Cargo.toml
│   └── src
│       └── main.rs
└── target
```

Для связи крейтов добавьте им зависимости

Файл: adder/Cargo.toml
```toml
[dependencies]
add-one = { path = "../add-one" }
```

Запуск конкретного крейта
```
$ cargo run -p adder
$ cargo test -p add-one
```

Если мы хотим использовать внешнюю зависимость, то следует добавить ее во все Cargo.toml используемых крейтов
и эта зависимость будет в общем Cargo.lock в единственном варианте (одна версия на всех)
