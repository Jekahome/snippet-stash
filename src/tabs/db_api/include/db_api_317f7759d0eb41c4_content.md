

 
 

**1. Документные базы**

Хранят данные в виде документов (JSON/BSON).

* **MongoDB**

  * [mongodb](https://docs.rs/mongodb) — официальный драйвер, async, поддерживает всё: CRUD, агрегаты, транзакции.
  * [wither](https://docs.rs/wither) — ODM (Object Document Mapper).
  * [bson](https://docs.rs/bson) — работа с BSON напрямую.

* **CouchDB**

  * [couch\_rs](https://docs.rs/couch_rs) — клиент для CouchDB, поддерживает REST API.

---

**2. Key-Value (KV) базы**

Хранят данные как ключ-значение, простые и быстрые.

* **Redis**

  * [redis-rs](https://docs.rs/redis) — официальный клиент.
  * [deadpool-redis](https://docs.rs/deadpool-redis) — async пул соединений.

* **RocksDB**

  * [rust-rocksdb](https://github.com/rust-rocksdb/rust-rocksdb) — биндинги для RocksDB.

* **sled**

  * Встраиваемая, ACID key-value база, написана на Rust. Иногда называют «SQLite для KV».

* **redb**

  * Современное встраиваемое KV-хранилище с ACID и транзакциями.

* **LMDB**

  * Через [heed](https://docs.rs/heed) — безопасный Rust-интерфейс.

---

**3. Wide-column (таблицы как в Bigtable / Cassandra)**

Хранят данные в виде строк и столбцов, масштабируются горизонтально.

* **ScyllaDB (совместим с Cassandra)**

  * [scylla-rust-driver](https://github.com/scylladb/scylla-rust-driver) — официальный драйвер, async.

* **Cassandra**

  * Можно работать через [cdrs-tokio](https://github.com/krojew/cdrs-tokio).

---

**4. Графовые базы**

Работают с данными в виде графов (узлы + связи).

* **Neo4j**

  * [neo4rs](https://github.com/neo4j-labs/neo4rs) — async драйвер для Neo4j.
  * Использует протокол Bolt.

---

**5. Поисковые движки (близко к NoSQL)**

* **Tantivy** — Rust-аналог Lucene.
* **MeiliSearch** — поисковая база, написана на Rust, простой REST API.
* **Quickwit** — распределённый поисковый движок, тоже на Rust.

---

**Итог**

* **Документные**: MongoDB (через `mongodb`), CouchDB (`couch_rs`).
* **KV**: Redis (`redis-rs`), sled (Rust-native), RocksDB, redb, LMDB.
* **Wide-column**: ScyllaDB, Cassandra (`cdrs-tokio`).
* **Графовые**: Neo4j (`neo4rs`).
* **Поиск (semi-NoSQL)**: Tantivy, MeiliSearch, Quickwit.

