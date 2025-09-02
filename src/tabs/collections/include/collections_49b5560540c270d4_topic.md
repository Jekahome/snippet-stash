

Алгоритм хеширования можно заменить на ослабленной HashMap основе с использованием методов:
* default, 
* with_hasher 
* with_capacity_and_hasher 

Многие альтернативные алгоритмы доступны на crates.io, например: 
* в crate [**fnv**](https://crates.io/crates/fnv).

[method.with_hasher](https://doc.rust-lang.org/stable/std/collections/struct.HashMap.html#method.with_hasher)

[crates.io/hasher...](https://crates.io/keywords/hasher)
 
[hashing-functions](https://doc.rust-lang.org/book/ch08-03-hash-maps.html#hashing-functions)
