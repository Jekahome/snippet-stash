

вы можете использовать `async fn и -> impl Trait` в сигнатурах методов трейта

`async fn` в трейтах: Позволяет объявлять метод трейта как async. Это означает, что он будет возвращать `impl Future<Output = ...>`, который можно будет `await'ить`.

`-> impl Trait` в трейтах (Return Position impl Trait - RPIT): Хотя эта возможность не является совершенно новой (RPIT в обычных функциях существовала раньше), ее использование становится особенно мощным в сочетании с async fn в трейтах. 

`async fn` по своей сути возвращает `impl Future`, и эта синтаксическая конструкция позволяет вам явно указать, что метод возвращает тип, который реализует определенный трейт (например, Future), без необходимости указывать конкретный тип Future
<pre><code class="language-rust">
use std::future::Future;

// Трейт с async fn и RPIT (impl Future)
trait DataFetcher {
    async fn fetch(&self, id: u32) -> String;
}

// Имплементация
struct MyFetcher;

impl DataFetcher for MyFetcher {
    async fn fetch(&self, id: u32) -> String {
        format!("fetched data for id = {}", id)
    }
}

// Использование
async fn use_fetcher(fetcher: &impl DataFetcher) {
    let result = fetcher.fetch(42).await;
    println!("Got: {}", result);
}
</code></pre>
