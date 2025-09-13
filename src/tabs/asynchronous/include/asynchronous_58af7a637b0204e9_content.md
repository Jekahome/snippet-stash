

Один общий обходной путь для включения async fn со ссылками в аргументах в `'static` футуру состоит в том, чтобы связать аргументы с вызовом `async fn` внутри `async-блока`
```
fn bad() -> impl Future<Output = u8> {
    let x = 5;
    borrow_x(&x) // ERROR: `x` does not live long enough
}
fn good() -> impl Future<Output = u8> {
    async {
        let x = 5;
        borrow_x(&x).await
    }
}
```
