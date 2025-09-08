

В экосистеме Rust поддержка HTTP/3 активно развивается. 


**Основные библиотеки для HTTP/3 и QUIC в Rust**

**1.** [quiche](https://github.com/cloudflare/quiche)

* **Описание**: Реализация протоколов QUIC и HTTP/3 от Cloudflare, соответствующая спецификациям IETF. Предоставляет низкоуровневый API для обработки QUIC-пакетов и управления состоянием соединений.
* **Особенности**: Позволяет создавать серверы и клиенты, поддерживающие HTTP/3.
* **Документация**: [docs.rs/quiche](https://docs.rs/quiche)

**2.** [quinn](https://github.com/quinn-rs/quinn)

* **Описание**: Асинхронная реализация QUIC для Rust, ориентированная на удобство использования и производительность.
* **Особенности**: Поддерживает HTTP/3 и интеграцию с Tokio.
* **Документация**: [docs.rs/quinn](https://docs.rs/quinn)

**3.** [neqo](https://github.com/mozilla/neqo)

* **Описание**: Реализация QUIC от Mozilla, используемая в Firefox и других продуктах.
* **Особенности**: Включает поддержку HTTP/3 и QPACK.
* **Документация**: [docs.rs/neqo](https://docs.rs/neqo)

**4.** [sec-http3](https://docs.rs/sec-http3)

* **Описание**: Асинхронная реализация HTTP/3 с поддержкой WebTransport.
* **Особенности**: Предоставляет модули для клиента, сервера и расширений протокола.
* **Документация**: [docs.rs/sec-http3](https://docs.rs/sec-http3)

**5.** [h3](https://crates.io/crates/h3)

* **Описание**: Библиотека для реализации HTTP/3 поверх предоставленного транспортного уровня QUIC.
* **Особенности**: Позволяет фокусироваться на реализации HTTP/3, делегируя работу с транспортом внешним компонентам.
* **Документация**: [docs.rs/h3](https://docs.rs/h3)



**Примеры использования**

* **Сервер на основе quinn**:

  * Создание простого HTTP/3 сервера с использованием библиотеки quinn.
  * Источник: [Building a QUIC HTTP/3 Server with Rust](https://medium.com/@dogabudak/building-a-quic-http-3-server-with-rust-edd196718c5d)

* **Инструмент для тестирования HTTP/3**:

  * h3i — инструмент командной строки и библиотека для низкоуровневого тестирования и отладки HTTP/3.
  * Источник: [Open sourcing h3i: a command line tool and library for low-level testing and debugging of HTTP/3](https://blog.cloudflare.com/h3i/)


**Ресурсы и сообщества**

* **Обсуждения на Rust Users Forum**:

  * [QUIC Support in RUST](https://users.rust-lang.org/t/quic-support-in-rust/102778)

* **Предложение по интеграции HTTP/3 в hyper**:

  * [HTTP/3 Crate Proposal for hyper](https://www.reddit.com/r/rust/comments/hwghk8/http3_crate_proposal_for_hyper/)

