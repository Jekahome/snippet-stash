

* **Локальный кэш внутри приложения** → `moka`, `cached`, `stretto`.
* **Встраиваемое KV-хранилище** → `sled`, `redb`.
* **In-memory SQL** → SQLite (`rusqlite` + `:memory:`).
* **Многопоточность** → `dashmap`, `evmap`.
* **Распределённый кэш/хранилище** → Redis, KeyDB, DragonflyDB.

Распределённые решения

Если нужно не только in-memory в одном процессе, а **кластерное** решение:

* **Redis (через redis-rs / deadpool-redis)**
* **KeyDB** (Redis-совместимый, но с multi-threading) — Rust клиенты те же.
* **DragonflyDB** (Redis API-compatible, high-performance, поддержка клиентов через `redis-rs`).
