

Предварительно мы рассмотрели типаж Future, который полезен в случае вычисления всего лишь одного значения в течение всего времени. 
Но иногда вычисления лучше представить в виде потока значений. Для примера, TCP слушатель производит множество TCP соединений в течение своего времени жизни.
<pre><code class="language-rust">
use tokio::stream::{self, StreamExt};
use tokio::sync::mpsc;
use tokio::time::{self, Duration};

#[tokio::main]
async fn main() {
    // Создаем канал для отправки и получения сообщений.
    let (tx, mut rx) = mpsc::channel(32);
    // Запускаем задачу, которая будет отправлять сообщения в канал каждую секунду.
    tokio::spawn(async move {
        for i in 1..=5 {
            tx.send(i).await.expect("Failed to send message");
            time::sleep(Duration::from_secs(1)).await;
        }
    });
    // Обрабатываем входящие сообщения из канала, используя поток.
    while let Some(value) = rx.recv().await {
        println!("Получено значение: {}", value);
    }
    println!("Все сообщения были обработаны.");
}
</code></pre>

---

<pre><code class="language-rust">
use tokio::stream::{self, StreamExt};
use tokio::time::{self, Duration};

#[tokio::main]
async fn main() {
    // Создаем поток с числами от 1 до 5, где каждый элемент будет появляться с интервалом 1 секунда.
    let mut stream = stream::unfold(1, |state| async move {
        if state <= 5 {
            // Ждем 1 секунду перед тем, как вернуть новое значение.
            time::sleep(Duration::from_secs(1)).await;
            Some((state, state + 1))
        } else {
            None
        }
    });
    while let Some(value) = stream.next().await {
        println!("Получено значение: {}", value);
    }
    println!("Поток завершил обработку.");
}

</code></pre>
