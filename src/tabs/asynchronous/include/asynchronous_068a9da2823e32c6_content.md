

Улучшение производительности через параллелизм
Если у вас есть несколько задач, которые можно выполнять параллельно, tokio::task::spawn позволяет запускать их одновременно:
<pre><code class="language-rust">
#[tokio::main]
async fn main() {
    let task1 = tokio::task::spawn(async {
        tokio::time::sleep(tokio::time::Duration::from_secs(1)).await;
        println!("Task 1 completed");
    });
    let task2 = tokio::task::spawn(async {
        tokio::time::sleep(tokio::time::Duration::from_secs(2)).await;
        println!("Task 2 completed");
    });
    // Ждём завершения обеих задач
    let _ = tokio::join!(task1, task2);
}
</code></pre>
