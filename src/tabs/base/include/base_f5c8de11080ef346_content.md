

```rust
Использование асинхронных замыканий с итераторами/коллекциями
use futures::stream::{self, StreamExt}; // Для StreamExt и from_iter
use reqwest; // Для асинхронных HTTP-запросов

#[tokio::main]
async fn main() {
    let urls = vec![
        "https://www.example.com/".to_string(),
        "https://www.rust-lang.org/".to_string(),
        "https://docs.rs/".to_string(),
    ];
 
    // Используем асинхронное замыкание с `map` и `buffer_unordered` для параллельной обработки
    let results: Vec<String> = stream::iter(urls)
        .map(async |url| { // Асинхронное замыкание захватывает `url`
            println!("Запрос: {}", url);
            match reqwest::get(&url).await {
                Ok(response) => {
                    if let Ok(text) = response.text().await {
                        format!("{} - Успех, длина: {}", url, text.len())
                    } else {
                        format!("{} - Ошибка чтения тела", url)
                    }
                },
                Err(e) => format!("{} - Ошибка запроса: {}", url, e),
            }
        })
        .buffer_unordered(2) // Одновременно обрабатываем до 2 запросов
        .collect()
        .await;

    println!("\nРезультаты загрузки:");
    for result in results {
        println!("{}", result);
    }
}
```

