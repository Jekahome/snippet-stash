

**tokio::spawn** используется для запуска задач в фоновом режиме на пуле потоков и возвращает handle, через который можно дожидаться завершения.

**join!** управляет задачами внутри текущего контекста исполнения.

**spawn** запускает задачи в пуле потоков и может масштабироваться между потоками.

<pre><code class="language-rust">
#[tokio::main]
async fn main() {
    // `join!` запускает несколько задач и ждет их завершения.
    let (res1, res2) = tokio::join!(task_one(), task_two());
    // `spawn` создает задачи, которые могут работать в фоновом режиме.
    let handle1 = tokio::spawn(task_one());
    let handle2 = tokio::spawn(task_two());
    // Ожидаем завершения фоновых задач
    let res1 = handle1.await.unwrap();
    let res2 = handle2.await.unwrap();
    println!("Results: {}, {}", res1, res2);
}
</code></pre>
