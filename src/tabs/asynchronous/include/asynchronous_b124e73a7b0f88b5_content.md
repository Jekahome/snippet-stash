


<pre><code class="language-rust">
use tokio::runtime::Builder;
use tokio::time::{sleep, Duration};

fn main() {
    // Создаем кастомный экземпляр Runtime
    let rt = Builder::new_multi_thread()
        .worker_threads(4) // Указываем количество рабочих потоков
        .max_blocking_threads(2) // Максимальное количество блокирующих потоков
        .enable_all() // Включаем таймеры, блокировку и другие функции
        .build()
        .expect("Failed to build runtime");

    // Используем созданный Runtime для выполнения асинхронной задачи
    rt.block_on(async {
        let task1 = async {
            println!("Task 1: Sleeping for 2 seconds");
            sleep(Duration::from_secs(2)).await;
            println!("Task 1: Done");
        };

        let task2 = async {
            println!("Task 2: Sleeping for 1 second");
            sleep(Duration::from_secs(1)).await;
            println!("Task 2: Done");
        };

        tokio::join!(task1, task2);
    });
}
</code></pre>
