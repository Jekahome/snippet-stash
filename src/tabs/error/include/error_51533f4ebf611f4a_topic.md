

* **map()** - обрабатывает только Ok(T) вариант Result ф-цией `|v|->T`
* **map_err()** - обрабатывать только Err(E) вариант Result ф-цией `|v|->T`
* **and_then()** - применяет ф-цию к значению внутри Ok
* **map_or()** - обрабатывает Ok или возвращает значение
* **map_or_else()** - обрабатывает Ok или возвращает значение из ф-ции

[enum.Result.html#method.map](https://doc.rust-lang.org/std/result/enum.Result.html#method.map)
