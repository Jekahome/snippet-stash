

❗Уже есть эти знания тут [Asynchronous I/O](https://jekahome.github.io/snippet-stash/tabs/asynchronous/index.html#модель-Акторов)


**Что делать, если я хочу заблокировать поток?**

**tokio::task::spawn_blocking** -  переносит операцию блокировки в поток за пределами пула потоков Tokio

**tokio::task::block_in_place** - Хотя эта функция позволяет избежать остановки других независимо созданных задач, любой другой код, выполняющийся одновременно в той же задаче, будет приостановлен во время вызова block_in_place. Это может произойти, например, при использовании join!макроса. Чтобы избежать этой проблемы, используйте spawn_blocking вместо этого.

[async-what-is-blocking](https://ryhl.io/blog/async-what-is-blocking/)

