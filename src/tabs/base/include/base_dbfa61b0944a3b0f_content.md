


<pre><code class="language-rust">
Сценарий использования с обработчиками событий (например, в веб-фреймворках)

// Упрощенный "фреймворк"
struct EventProcessor {
    // В реальном мире здесь будет что-то более сложное,
    // возможно, Vec<Box<dyn Fn(...) -> Pin<Box<dyn Future<Output = ()> + Send>>>>
}

impl EventProcessor {
    async fn process_event<F, Fut>(&self, handler: F)
    where
        F: Fn() -> Fut, // Обработчик принимает () и возвращает Future
        Fut: std::future::Future<Output = ()>, // Future возвращает ()
    {
        println!("Обработка события...");
        handler().await; // Выполняем асинхронный обработчик
        println!("Событие обработано.");
    }
}

#[tokio::main]
async fn main() {
    let processor = EventProcessor {};

    // Регистрируем асинхронный обработчик события с помощью async closure
    processor.process_event(async || {
        println!("Выполняется асинхронный обработчик...");
        tokio::time::sleep(tokio::time::Duration::from_millis(500)).await;
        println!("Асинхронный обработчик завершен.");
    }).await;

    println!("Готово!");
}
</code></pre>
