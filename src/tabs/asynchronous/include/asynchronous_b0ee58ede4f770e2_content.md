


<pre><code class="language-rust">
use tokio::time::{sleep, Duration};
use futures::future::FutureExt; // Для использования метода `and_then`

async fn task_one() -> u32 {
    sleep(Duration::from_secs(2)).await;
    println!("Task one completed with result: 42");
    42
}
async fn task_two(value: u32) -> String {
    sleep(Duration::from_secs(1)).await;
    println!("Task two received value: {}", value);
    format!("Processed value: {}", value * 2)
}
#[tokio::main]
async fn main() {
    // Запуск первой задачи
    let future = task_one()
        .map(|value| value + 1) // Дополнительная обработка результата
        .and_then(|value| {
            // Запуск второй задачи с результатом первой
            async move {
                let result = task_two(value).await;
                Ok(result)
            }
        });
    // Ожидание завершения всей цепочки и вывод результата
    match future.await {
        Ok(result) => println!("Final result: {}", result),
        Err(e) => eprintln!("An error occurred: {}", e),
    }
}
</code></pre>
