

Ошибка

```
error[E0282]: type annotations needed for Box<_>
  --> /home/jeka/.cargo/registry/src/index.crates.io-6f17d22bba15001f/time-0.3.34/src/format_description/parse/mod.rs:83:9
   |
83 |     let items = format_items
   |         ^^^^^
...
86 |     Ok(items.into())
   |              ---- type must be known at this point
   |
   = note: this is an inference error on crate time caused by an API change in Rust 1.80.0; update time to version >=0.3.35 by calling cargo update
```

Поскольку в вашем проекте используется версия библиотеки time 0.3.34, которая несовместима с последней версией компилятора Rust, вам необходимо обновить зависимость библиотеки time до версии 0.3.35 или выше, где эта проблема уже исправлена.

```
cargo update -p time
cargo build
```
