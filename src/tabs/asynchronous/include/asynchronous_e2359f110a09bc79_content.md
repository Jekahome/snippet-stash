


<pre><code class="language-rust">
#[tokio::main]
async fn main() {
    // Определяем асинхронную функцию, которая принимает замыкание
    async fn my_async_function<F>(f: F)
    where
        F: Fn() + Send + 'static, {
          // Вызываем замыкание
          f();
    }
    // Замыкание, которое будет передано в асинхронную функцию
    let my_closure = || {
        println!("Hello from the closure!");
    };
    // Запускаем асинхронную задачу и передаем в нее замыкание
    let handle = tokio::task::spawn(async move {
        my_async_function(my_closure).await; // Вызываем асинхронную функцию
    });
    handle.await.unwrap(); // Ожидаем завершения задачи
}
</code></pre>
