

```
// Эта функция:
async fn foo() {
    step_one().await;
    step_two().await;
}
// создаёт типы, подобные следующим:
enum Foo {
    First(StepOne),
    Second(StepTwo),
}
// создаёт такие типы:
enum Recursive {
    First(Recursive),
    Second(Recursive),
}

// А эта функция не будет работать  - мы создали тип бесконечного размера!:
async fn recursive() {
    recursive().await;
    recursive().await;
}
```


Чтобы исправить это, мы должны ввести косвенность при помощи Box. 
К сожалению, из-за ограничений компилятора, обернуть вызов `recursive()` в `Box::pin` не достаточно. 
Чтобы это заработало, мы должны сделать recursive не асинхронной функцией, которая возвращает `.boxed()` с async блоком:
```
use futures::future::{BoxFuture, FutureExt};
fn recursive() -> BoxFuture<'static, ()> {
    async move {
        recursive().await;
        recursive().await;
    }.boxed()
}
```
