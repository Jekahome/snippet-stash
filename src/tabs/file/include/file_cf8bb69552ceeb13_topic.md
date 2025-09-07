

**Чтение**

* **std::fs::read(path)** — читает файл в `Vec<u8>`.
* **std::fs::read\_to\_string(path)** — читает файл в `String`.
* **std::fs::read\_dir(path)** — возвращает итератор по элементам директории (`DirEntry`).
* **std::fs::read\_link(path)** — возвращает путь, на который указывает символическая ссылка.
* **std::fs::symlink\_metadata(path)** — возвращает метаданные файла/директории, не разыменовывая симлинк.
* **std::fs::metadata(path)** — возвращает метаданные, разыменовывая симлинк.

Trait Read

[trait.Read.read_to_string](https://doc.rust-lang.org/std/io/trait.Read.html#method.read_to_string) - Запись содержимого в буфер
