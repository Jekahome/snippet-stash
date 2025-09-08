

* **SQLite in-memory mode**

  * Через [rusqlite](https://docs.rs/rusqlite) можно запустить `sqlite::memory:` и получить полноценную SQL-базу без файлов.
  * Отлично подходит для тестов и временных данных.
