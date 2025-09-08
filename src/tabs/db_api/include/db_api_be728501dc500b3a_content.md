

Сравнительная таблица: Очереди сообщений в Rust

| 🐙 Брокер / Очередь                | 🔗 Протокол | 📦 Основной crate                                                                    | ⚡ Поддержка async   | 🚀 Особенности / когда применять                                           |
| ---------------------------------- | ----------- | ------------------------------------------------------------------------------------ | ------------------- | -------------------------------------------------------------------------- |
| **RabbitMQ**                       | AMQP 0.9.1  | [lapin](https://docs.rs/lapin)                                                       | ✅ Tokio / async-std | Классическая очередь сообщений, подтверждения, маршрутизация, стабильность |
|                                    |             | [amiquip](https://github.com/jgallagher/amiquip)                                     | ❌ только sync       | Старый клиент, можно для простых случаев                                   |
| **Kafka**                          | Kafka API   | [rdkafka](https://docs.rs/rdkafka)                                                   | ✅ Tokio             | Высокая производительность, большие кластеры, стриминг данных              |
| **NATS**                           | NATS        | [nats](https://docs.rs/nats)                                                         | ✅ sync + async      | Лёгкий брокер, Pub/Sub, очереди, JetStream (персистентность)               |
| **MQTT (Mosquitto, HiveMQ, EMQX)** | MQTT v3/v5  | [rumqttc](https://docs.rs/rumqttc)                                                   | ✅ Tokio             | IoT, лёгкие устройства, стабильный клиент                                  |
|                                    |             | [mqtt-async-client](https://docs.rs/mqtt-async-client)                               | ✅                   | Более минималистичный async MQTT клиент                                    |
| **ZeroMQ**                         | ZeroMQ      | [zmq](https://docs.rs/zmq)                                                           | ❌ sync (через C)    | Высокая скорость, flexible messaging, подходит для P2P и микро-протоколов  |
| **Nanomsg / NNG**                  | NNG         | [nng-rs](https://github.com/fxgray/nng-rs)                                           | ✅ (частично)        | Простая альтернатива ZeroMQ, поддержка разных паттернов обмена             |
| **Pulsar**                         | Pulsar API  | [pulsar-rs](https://github.com/wyyerd/pulsar-rs)                                     | ✅ Tokio             | Альтернатива Kafka, масштабируемые очереди и стримы                        |
| **Redis (Pub/Sub, Streams)**       | RESP        | [redis-rs](https://docs.rs/redis) + [deadpool-redis](https://docs.rs/deadpool-redis) | ✅                   | Используется как лёгкий брокер, Pub/Sub или очереди через Streams          |

---

**Как выбрать?**

* **Классический брокер** → RabbitMQ (`lapin`)
* **Big Data, стриминг** → Kafka (`rdkafka`)
* **Лёгкий брокер / Cloud-native** → NATS (`nats`)
* **IoT и устройства** → MQTT (`rumqttc`)
* **Низкоуровневый messaging** → ZeroMQ (`zmq`) или Nanomsg (`nng-rs`)
* **Масштабируемая альтернатива Kafka** → Pulsar (`pulsar-rs`)
* **Если уже есть Redis** → использовать Pub/Sub или Streams (`redis-rs`)

