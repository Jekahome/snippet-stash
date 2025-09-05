

<pre><code class="language-rust">
use futures::future::{self, Loop};
use std::time::Duration;
use tokio::time::sleep;

#[tokio::main]
async fn main() {
    let mut counter = 0;
    // Создаем цикл с использованием future::loop_fn
    let future = future::loop_fn(counter, |mut state| {
        let new_state = state + 1;
        // Асинхронная задача, которая выполняется на каждой итерации
        Box::pin(async move {
            println!("Counter value: {}", state);
            // Условие завершения цикла
            if state >= 5 {
                // Если условие выполнено, возвращаем Loop::Break с результатом
                return Loop::Break(state);
            }
            // В противном случае продолжаем цикл
            sleep(Duration::from_secs(1)).await; // Пауза на 1 секунду
            Loop::Continue(new_state)
        })
    });
    // Выполняем асинхронный цикл
    let result = future.await;
    println!("Loop completed with final value: {}", result);
}
</code></pre>
