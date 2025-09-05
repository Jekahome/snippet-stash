

Реализация трейта `std::future::Future` в Rust нужна для создания объектов, которые представляют собой отложенные вычисления, результат которых станет доступен в будущем. Это ключевой компонент асинхронного программирования в Rust.

```toml
[dependencies]
futures = "0.3"
```

<pre><code class="language-rust">
/// Этот пример показывает минимальную реализацию std::future::Future для задачи с задержкой на один цикл выполнения.
/// Т.е. при первом опросе `poll` изменяыется состояние обьекта которые при втором опросе 
/// отдаст результат завершения `Poll::Ready`
mod one_execution_cycle{
    use futures::task::Context;
    use std::future::Future;
    use std::pin::Pin;
    use std::task::Poll;
    struct SimpleFuture{
        completed: bool,
    }
    impl Future for SimpleFuture {
        type Output = u32;
    
        fn poll(mut self: Pin<&mut Self>, _cx: &mut Context<'_>) -> Poll<Self::Output> {
            if self.completed {
                Poll::Ready(42) // Возвращаем результат, когда готовы
            } else {
                self.completed = true;
                Poll::Pending // Говорим, что нужно подождать
            }
        }
    }
    
    // Output:
    // Still pending...
    // 42
    pub fn run() {
        let mut future = SimpleFuture { completed: false };
        let waker = futures::task::noop_waker();
        let mut context = Context::from_waker(&waker);
        let mut pinned = Box::pin(future);
        loop{
            match pinned.as_mut().poll(&mut context) {
                Poll::Ready(result) => {println!("{}", result);break;},
                Poll::Pending => {println!("Still pending...");},
            }        
        }
    }
}
fn main(){
   one_execution_cycle::run();
}
</code></pre>
