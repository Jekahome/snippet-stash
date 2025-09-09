

Install:
```
# supports all databases supported by SQLx
$ cargo install sqlx-cli

# only for postgres
$ cargo install sqlx-cli --no-default-features --features postgres

$ sqlx <command> --help
```

URL должен быть: 
* либо в строке запроса --database-url
* либо в .env файле DATABASE_URL
* либо в переменных среды DATABASE_URL

**Создать / удалить базу данных**
```
sqlx database create --database-url postgres://{user}:{password}@{host}:{port}/{dbname}
sqlx database drop --database-url postgres://{user}:{password}@{host}:{port}/{dbname}
```

Создание двух файлов миграции .up.sql / .down.sql (попытка смешать "простые" миграции с обратимыми -r миграциями приводит к ошибке)
```
$ sqlx migrate add -r <name>

$ sqlx migrate run

отмена миграции
$ sqlx migrate add -r <name>

отмена всех миграции (созданных с флагом -r т.е. отработают .down.sql миграции)
$ sqlx migrate revert
```

