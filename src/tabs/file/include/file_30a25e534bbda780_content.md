

Методы std::fs::DirEntry

* **`path`** — возвращает полный путь (`PathBuf`) к элементу.
* **`file_name`** — возвращает имя файла (последний компонент пути) как `OsString`.
* **`metadata`** — возвращает [`Metadata`](https://doc.rust-lang.org/std/fs/struct.Metadata.html) (размер, время модификации, права).
* **`file_type`** — возвращает [`FileType`](https://doc.rust-lang.org/std/fs/struct.FileType.html) (директория, файл или симлинк).
* **`file_type()` + `is_dir()` / `is_file()` / `is_symlink()`** — проверка типа.
* **`into_path`** — забирает путь во владение (`PathBuf`).
