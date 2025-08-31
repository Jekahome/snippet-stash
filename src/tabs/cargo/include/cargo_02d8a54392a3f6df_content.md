

```
$ cargo metadata > /home/jeka/file.json
```

Output:

```
{
  // Версия формата сообщений .
  "version": integer,

  // Список пакетов для проекта, включая зависимости.
  "packages": [
    {
      // Уникальный идентификатор пакета.
      "id": PackageId,
      "name": string,
      "version": string,
      "source": SourceId,

      // Список объявленных зависимостей. Используемые зависимости описаны в пол `resolve`.
      "dependencies": [ Dependency ],

      "targets: [ Target ],

      // Путь до Cargo.toml
      "manifest_path": string,
    }
  ],
  "workspace_members": [ PackageId ],

  // Граф зависимостей.
  "resolve": {
     "nodes": [
       {
         "id": PackageId,
         "dependencies": [ PackageId ]
       }
     ]
  }
}
```
