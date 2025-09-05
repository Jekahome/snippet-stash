

Как вызвать блокирующие или ресурсоёмкие задачи

tokio::task::spawn_blocking , block_in_place
Так же, как task::spawn, task::spawn_blocking возвращает JoinHandle

В отличие от task::spawn где не блокируется поток, spawn_blocking  вместо этого порождает функцию блокировки в выделенном пуле потоков для блокировки задач

[tokio/task](https://docs.rs/tokio/1.12.0/tokio/task/index.html)

[async-what-is-blocking](https://ryhl.io/blog/async-what-is-blocking/)
