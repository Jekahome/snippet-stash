

* **map()** - обрабатывает только Ok(T) вариант Result ф-цией `|v|->T`
* **map_err()** - обрабатывать только Err(E) вариант Result ф-цией `|v|->T`
* **and_then()** - нужен для разворачивания результата Ok

[enum.Result.html#method.map](https://doc.rust-lang.org/std/result/enum.Result.html#method.map)
