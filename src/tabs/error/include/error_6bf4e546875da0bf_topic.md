


* **unwind** - Размотайте stack вызовов в случае паники.  
* **abort** - Завершите процесс в случае паники.

[lurklurk.org/effective-rust/panic](https://www.lurklurk.org/effective-rust/panic.html)

Игнорируют настройку паники
* tests
* benchmarks
* build scripts
* proc macros

File Cargo.toml:

```toml
[profile.dev]
panic = "abort"
```


