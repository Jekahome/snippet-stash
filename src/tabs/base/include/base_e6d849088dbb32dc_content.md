


<pre><code class="language-rust">
асинхронная операция, которую мы хотим выполнить внутри замыкания

#[tokio::main]
async fn main() {
    println!("Начинаем асинхронные замыкания!");

    // Создаем асинхронное замыкание
    let my_async_closure = async || {
        tokio::time::sleep(tokio::time::Duration::from_secs(1)).await;
        println!("Привет из асинхронного замыкания!");
        42 // Возвращаемое значение из замыкания
    };

    // Выполняем асинхронное замыкание
    let result = my_async_closure().await;
    println!("Результат из асинхронного замыкания: {}", result);

    println!("Завершаем асинхронные замыкания!");
}
</code></pre>
