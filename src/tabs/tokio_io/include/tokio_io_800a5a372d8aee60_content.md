


**1. Переключение на специальную задачу для управления состоянием и передачи сообщений**
<pre><code class="language-rust">

// Это Клиент, для запуска сервера $ mini-redis-server
// Передача команд
use bytes::Bytes;
use mini_redis::client;
use tokio::sync::{mpsc, oneshot};

/// Несколько разных команд мультиплексируются по одному каналу.
#[derive(Debug)]
enum Command {
    Get {
        key: String,   resp: Responder<Option<Bytes>>,
    },
    Set {
        key: String,   val: Bytes,   resp: Responder<()>,
    },
}
/// Предоставляется запрашивающей стороной и используется задачей менеджера для отправки команды ответ на запрос.
type Responder<T> = oneshot::Sender<mini_redis::Result<T>>;

#[tokio::main]
async fn main() {
    // Обмен данными через каналы. Один канал mpsc::channel прослушивает в менеджере и отправляет в других потоках, другой канал oneshot служит для возврата данных из менеджера
    // tx - Sender отправитель
    // rx - Receiver получатель
    let (tx, mut rx) = mpsc::channel(32);// Емкость вмещает 32 сообщения. Несколькими Sender и одним Receiver. Можно отправить множество значений.
    let tx2 = tx.clone();
    let manager = tokio::spawn(async move {
        // Open a connection to the mini-redis address.
        let mut client = client::connect("127.0.0.1:6379").await.unwrap();

        while let Some(cmd) = rx.recv().await {// None если все Sender були удалены
            println!(".");
            match cmd {
                Command::Get { key, resp } => {
                    let res = client.get(&key).await;
                    // Ignore errors
                    let _ = resp.send(res);// не требует await так как oneshot завершается сразу или выдает ошибку
                }
                Command::Set { key, val, resp } => {
                    let res = client.set(&key, val).await;
                    // Ignore errors
                    let _ = resp.send(res);// не требует await так как oneshot завершается сразу или выдает ошибку
                } } } });
    // Создайте две задачи, одна устанавливает значение, а другая запрашивает ключ, который был установлен.
    let t1 = tokio::spawn(async move {
        let (resp_tx, resp_rx) = oneshot::channel();
        let cmd = Command::Get {
            key: "foo".to_string(),
            resp: resp_tx,
        };
        // Send the GET request
        if tx.send(cmd).await.is_err() {
            eprintln!("connection task shutdown");  return;
        }
        let res = resp_rx.await;
        println!("GOT (Get) = {:?}", res);
    });
    let t2 = tokio::spawn(async move {
        let (resp_tx, resp_rx) = oneshot::channel();
        let cmd = Command::Set {
            key: "foo".to_string(),
            val: "bar".into(),
            resp: resp_tx,
        };
        // Send the SET request
        if tx2.send(cmd).await.is_err() {
            eprintln!("connection task shutdown");  return;
        }
        let res = resp_rx.await;
        println!("GOT (Set) = {:?}", res)
    });
    t1.await.unwrap();
    t2.await.unwrap();
    manager.await.unwrap();
}
</code></pre>
