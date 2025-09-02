

**entry**`(&mut self, key: K) -> Entry<K, V>`  есть ключ или нет ключа. Получает соответствующую запись соответствующего ключа на карте для манипуляций на месте.

`entry().or_insert()`

HashMap реализует   Entry API

[method.entry](https://doc.rust-lang.org/stable/std/collections/struct.HashMap.html#method.entry)
 
// манипулирования содержимого map условно на наличии ключа или нет
* std::collections::hash_map::Entry
    * Occupied(OccupiedEntry`<'a, K, V>`) - занятая запись
    * Vacant(VacantEntry`<'a, K, V>`) - свободная

Struct std::collections::hash_map::[VacantEntry](https://doc.rust-lang.org/stable/std/collections/hash_map/struct.VacantEntry.html)

Struct std::collections::hash_map::[OccupiedEntry](https://doc.rust-lang.org/stable/std/collections/hash_map/struct.OccupiedEntry.html#method.get) 




