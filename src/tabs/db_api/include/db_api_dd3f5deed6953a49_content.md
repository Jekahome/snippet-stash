

 

**Полнотекстовые поисковые движки**

[**Tantivy**](https://github.com/quickwit-oss/tantivy)

* Аналог Lucene, но написанный на Rust.
* Поддерживает индексацию больших объёмов данных, быстрый поиск, ранжирование по релевантности.
* Используется в [MeiliSearch](https://github.com/meilisearch/meilisearch) и [Quickwit](https://github.com/quickwit-oss/quickwit).

[**MeiliSearch**](https://github.com/meilisearch/meilisearch)

* Построен на Tantivy.
* Упрощённый движок для полнотекстового поиска с **нечётким поиском (fuzzy matching)** и typo tolerance «из коробки».
* Очень быстрый, с REST API.

[**Quickwit**](https://github.com/quickwit-oss/quickwit)

* Движок поиска для логов и аналитики.
* Распределённый, тоже использует Tantivy.



**Библиотеки для нечеткого поиска (fuzzy search)**

[**fuzzy-matcher**](https://docs.rs/fuzzy-matcher)

* Простая библиотека для нечеткого поиска строк.
* Использует алгоритмы Skim и Sublime Text.
* Хорошо подходит для CLI (например, автодополнение, поиск по файлам).

[**strsim**](https://docs.rs/strsim)

* Реализация разных метрик сходства строк:

  * Levenshtein
  * Damerau-Levenshtein
  * Jaro, Jaro-Winkler
  * Sørensen-Dice
* Подходит для оценки схожести строк и «поиска с ошибками».

[**fst**](https://github.com/BurntSushi/fst)

* Реализация **finite state transducers** для поиска по словарям.
* Очень быстрый поиск по огромным наборам строк.
* Можно использовать для реализации автодополнения или похожих слов.



**Другие варианты**

* [nlprule](https://github.com/bminixhofer/nlprule) — NLP-инструменты (грамматика, правила), можно расширить под поиск.
* [tantivy-fst](https://github.com/quickwit-oss/tantivy/tree/main/fst) — связка Tantivy + fst для быстрых префиксных/фаззи-запросов.

 
**Сравнение поисковых библиотек**

| Библиотека / Движок | Тип | Основные возможности | Где применять |
|---------------------|-----|----------------------|---------------|
| [Tantivy](https://github.com/quickwit-oss/tantivy) | Полнотекстовый движок (аналог Lucene) | Индексация больших объёмов данных, ранжирование, быстрый поиск, поддержка сложных запросов | Свой поисковый движок, аналитика, логирование |
| [MeiliSearch](https://github.com/meilisearch/meilisearch) | Готовый полнотекстовый движок (REST API) | Построен на Tantivy, fuzzy search, typo tolerance, релевантность «из коробки» | Быстро развернуть поисковый сервис, поиск по сайту/продуктам |
| [fuzzy-matcher](https://docs.rs/fuzzy-matcher) | Fuzzy search (по строкам) | Алгоритмы Skim и Sublime Text для поиска с опечатками | CLI тулзы, поиск по файлам, автодополнение |
| [strsim](https://docs.rs/strsim) | Метрики сходства строк | Levenshtein, Damerau-Levenshtein, Jaro(-Winkler), Sørensen-Dice | Сравнение строк, поиск похожих слов, проверка опечаток |
| [fst](https://github.com/BurntSushi/fst) | Поиск по словарям (Finite State Transducers) | Очень быстрый поиск по огромным наборам строк, поддержка префиксов и fuzzy | Автодополнение, словари, индексирование ключей |


**Вывод**:

* Если нужен **готовый движок с API** → бери **MeiliSearch**.
* Если нужен **низкоуровневый движок для индексации** → **Tantivy**.
* Если нужен **просто fuzzy matching по строкам** → **fuzzy-matcher** или **strsim**.
* Если нужен **массовый поиск по словарям** → **fst**.

**Вывод**:

* **Большие данные и сложные запросы** → `Tantivy`
* **Готовый движок с REST API и fuzzy** → `MeiliSearch`
* **Лёгкий fuzzy-поиск по строкам** → `fuzzy-matcher`
* **Оценка похожести строк** → `strsim`
* **Поиск по словарям/ключам** → `fst`
