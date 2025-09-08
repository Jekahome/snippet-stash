



Сравнение библиотек WebSocket для Rust

| Библиотека                                                                                               | Клиент        | Сервер        | Асинхронность                                                                          | Особенности                                            |
| -------------------------------------------------------------------------------------------------------- | ------------- | ------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| [**wtx**](https://github.com/c410-f3r/wtx)                                                               | ✅             | ✅             |  да                                                                                     | Поддержка шифрования                                   |
| [**ws-rs**](https://github.com/housleyjk/ws-rs)                                                          | ✅             | ✅             |  нет (событийная модель)                                                                | Лёгкая, событийно-ориентированная                      |
| [**urlshortener-rs**](https://github.com/iddm/urlshortener-rs)                                           | ❌             | ❌             | ❌                                                                                      | Не WebSocket, а библиотека для сокращения ссылок       |
| [**ratchet**](https://github.com/graphform/ratchet) / [ratchet\_rs](https://crates.io/crates/ratchet_rs) | ✅             | ✅             |  да (полностью async/await)                                                             | Поддержка расширений и Deflate-сжатия                  |
| [**rust-websocket**](https://github.com/websockets-rs/rust-websocket)                                    | ✅             | ✅             |  частично (есть sync и async API)                                                       | Фреймворк для работы с клиентами и серверами           |
| [**tungstenite-rs**](https://github.com/snapview/tungstenite-rs)                                         | ✅             | ✅             |  нет (sync), но есть [async-tungstenite](https://github.com/snapview/async-tungstenite) | Лёгкая потоковая реализация                            |
| [**websocat**](https://github.com/vi/websocat)                                                           | ✅ (через CLI) | ✅ (через CLI) |  зависит от окружения                                                                   | CLI-инструмент, аналог Netcat/Curl/Socat для WebSocket |



Итог:

* Если нужен **CLI** → websocat.
* Если нужен **чистый sync** → tungstenite или ws-rs.
* Если нужен **асинхронный runtime** → ratchet или async-tungstenite.
* Если нужна **гибридная поддержка** (sync + async) → rust-websocket.
* Если нужен **сильный упор на безопасность/шифрование** → wtx.

