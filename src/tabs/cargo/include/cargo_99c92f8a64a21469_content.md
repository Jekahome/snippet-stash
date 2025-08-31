


Запуск одного приложения из разных источников

```toml
Cargo.toml:
[package]
....
default-run = "main"

[[bin]]
name = "main"
path = "src/main.rs"

[[bin]]
name = "websocket-server"
path = "src/main.rs"

[[bin]]
name = "websocket-client"
path = "src/client.rs"
```

Запуск:
```
 cargo run // запуститься по дефолту main.rs
 cargo run --bin websocket-server
 cargo run --bin websocket-client
```
