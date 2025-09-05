


<pre><code class="language-rust">
use tokio::time::{sleep, Duration};
use futures::future::join_all;

async fn task_one() -> u32 {
    sleep(Duration::from_secs(2)).await;
    println!("Task one completed");
    42
}
async fn task_two() -> u32 {
    sleep(Duration::from_secs(1)).await;
    println!("Task two completed");
    24
}
async fn task_three() -> u32 {
    sleep(Duration::from_secs(3)).await;
    println!("Task three completed");
    7
}
#[tokio::main]
async fn main() {
    // Создаем список задач
    let tasks = vec![task_one(), task_two(), task_three()];
    // Используем `join_all` для запуска всех задач параллельно и ожидания их завершения
    let results = join_all(tasks).await;
    // Печать результатов выполнения всех задач
    for result in results {
        println!("Task completed with result: {}", result);
    }
}
</code></pre>
