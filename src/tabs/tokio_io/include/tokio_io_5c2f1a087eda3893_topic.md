

#### Runtime

An `async fn` используется, когда мы хотим войти в асинхронный контекст. Однако асинхронные функции должны выполняться во время выполнения. Среда выполнения содержит асинхронный планировщик задач, обеспечивает событийный ввод-вывод, таймеры и т. д. Среда выполнения не запускается автоматически, поэтому ее должна запустить основная функция.

макрос `#[tokio::main]` преобразует `async fn main()` в синхронный `fn main()`, который инициализирует экземпляр среды выполнения и выполняет асинхронную основную функцию

[tokio/runtime](https://docs.rs/tokio/latest/tokio/runtime/index.html)

[tokio/runtime/struct.Builder](https://docs.rs/tokio/latest/tokio/runtime/struct.Builder.html)

[tokio/runtime/struct.Runtime](https://docs.rs/tokio/latest/tokio/runtime/struct.Runtime.html)


