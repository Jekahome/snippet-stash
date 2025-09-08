

 
**Очереди сообщений и брокеры в Rust**

**1. RabbitMQ (AMQP)**

* **[lapin](https://docs.rs/lapin)**

  * Популярный async AMQP 0.9.1 клиент.
  * Поддержка `tokio`, `async-std`.
  * Работает с RabbitMQ и совместимыми брокерами.
* **[amiquip](https://github.com/jgallagher/amiquip)**

  * Более старый sync-клиент для AMQP.

---

**2. Kafka**

* **[rdkafka](https://docs.rs/rdkafka)** (официально: *rust-rdkafka*)

  * Обёртка над `librdkafka` (C-библиотека).
  * Очень производительная, production-ready.
  * Поддержка:

    * Consumer / Producer
    * Streaming API
    * Commit offset-ов
    * Async + интеграция с `tokio`.

---

**3. NATS**

* **[nats](https://docs.rs/nats)**

  * Лёгкий и быстрый брокер (часто называют "Redis для сообщений").
  * Поддержка Pub/Sub, очередей, JetStream (хранение сообщений).
  * Есть sync и async API.

---

**4. MQTT (IoT и лёгкие брокеры)**

* **[rumqttc](https://docs.rs/rumqttc)**

  * Популярный MQTT v3/v5 клиент.
  * Есть async-версия (`tokio`).
* **[mqtt-async-client](https://docs.rs/mqtt-async-client)**

  * Асинхронный MQTT клиент.
* Работает с брокерами: Mosquitto, HiveMQ, EMQX.

---

**5. ZeroMQ / Nanomsg**

* **[zmq](https://docs.rs/zmq)**

  * Bindings к ZeroMQ (через C-библиотеку).
* **[nng-rs](https://github.com/fxgray/nng-rs)**

  * Rust-интерфейс к nanomsg-next-gen.
* Хорошо подходят для быстрых одноузловых и распределённых систем.

---

**6. Native Rust проекты (экспериментальные)**

* **[redis-pubsub](https://redis.io/docs/interact/pubsub/)**

  * Redis можно использовать как брокер сообщений (через `redis-rs`).
* **[Apache Pulsar](https://github.com/wyyerd/pulsar-rs)**

  * Есть async клиент для Pulsar.
* **[Nats.io JetStream](https://docs.rs/nats)**

  * Нативная поддержка персистентных очередей и стримов.

---

**Итог**

* **RabbitMQ / AMQP** → `lapin` (async, production-ready).
* **Kafka** → `rust-rdkafka` (производительность, масштабируемость).
* **NATS** → `nats` (лёгкий, быстрый, Pub/Sub + JetStream).
* **MQTT** → `rumqttc` или `mqtt-async-client` (IoT).
* **ZeroMQ/Nanomsg** → `zmq`, `nng-rs` (низкоуровневый messaging).
* **Экзотика** → Pulsar (`pulsar-rs`), Redis Pub/Sub.


