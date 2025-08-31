

```
#![deny(clippy::single_match, clippy::box_vec)]
#![allow(clippy::single_match, clippy::box_vec)]
#![warn(clippy::single_match, clippy::box_vec)]
#![forbid(clippy::single_match, clippy::box_vec)]

    clippy::all(все , что по умолчанию: все категории ниже , за исключением nursery, pedanticи cargo)
    clippy::correctness (код, который является просто неправильным или очень очень бесполезным, по умолчанию вызывает серьезные ошибки)
    clippy::style (код, который должен быть написан более идиоматическим способом)
    clippy::complexity (код, который делает что-то простое, но сложным образом)
    clippy::perf (код, который можно написать быстрее)
    clippy::pedantic (строчки довольно строгие, по умолчанию отключены)
    clippy::nursery (новые линты, которые еще не совсем готовы, по умолчанию отключены)
    clippy::cargo (проверка по грузовому манифесту, по умолчанию отключена)
```
