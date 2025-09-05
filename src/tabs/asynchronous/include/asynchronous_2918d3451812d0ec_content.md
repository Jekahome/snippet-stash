


<pre><code class="language-rust">
use futures::future::{self, FutureExt};
use std::error::Error;
use tokio::time::{sleep, Duration};

#[tokio::main]
async fn main() {
    // Основная асинхронная задача, которая может завершиться с ошибкой
    let main_future = async {
        println!("Running main future...");
        Err::<u32, &str>("Something went wrong!")
    };
    // Вторая асинхронная задача, которая будет выполнена в случае ошибки
    let fallback_future = async {
        println!("Running fallback future...");
        Ok(42)
    };
    // Использование `or_else` для переключения на альтернативную операцию при ошибке
    let result = main_future.or_else(|err| {
        println!("Error occurred: {}", err);
        fallback_future
    }).await;
    match result {
        Ok(value) => println!("Final result: {}", value),
        Err(err) => println!("Failed with error: {}", err),
    }
}
</code></pre>
