

Асинхронные блоки и функции возвращают типы, реализующие этот Futureпризнак. Возвращаемый тип является результатом преобразования компилятора, который превращает локальные переменные в данные, хранящиеся внутри будущего.

Некоторые из этих переменных могут содержать указатели на другие локальные переменные. По этой причине будущее никогда не следует перемещать в другую ячейку памяти, поскольку это сделает эти указатели недействительными.

Чтобы предотвратить перемещение будущего типа в памяти, его можно опросить только через закрепленный указатель. 
Pin— это оболочка ссылки, которая запрещает все операции, которые могли бы переместить экземпляр, на который она указывает, в другую ячейку памяти.
<pre><code class="language-rust">
use tokio::sync::{mpsc, oneshot};
use tokio::task::spawn;
use tokio::time::{sleep, Duration};

// A work item. В этом случае просто поспите заданное время и ответьте 
// сообщением в канале `respond_on`.
#[derive(Debug)]
struct Work {
    input: u32,
    respond_on: oneshot::Sender<u32>,
}
// worker, который прослушивает очередь заданий и выполняет их.
async fn worker(mut work_queue: mpsc::Receiver<Work>) {
    let mut iterations = 0;
    loop {
        tokio::select! {
            Some(work) = work_queue.recv() => {
                sleep(Duration::from_millis(10)).await; // Притворяйтесь, что работаете.
                work.respond_on
                    .send(work.input * 1000)
                    .expect("failed to send response");
                iterations += 1;
            }
            // TODO: сообщать количество итераций каждые 100 мс
        }
    }
}
// Инициатор запроса, который запрашивает работу и ждет ее завершения.
async fn do_work(work_queue: &mpsc::Sender<Work>, input: u32) -> u32 {
    let (tx, rx) = oneshot::channel();
    work_queue
        .send(Work { input, respond_on: tx })
        .await
        .expect("failed to send on work queue");
    rx.await.expect("failed waiting for response")
}
#[tokio::main]
async fn main() {
    let (tx, rx) = mpsc::channel(10);
    spawn(worker(rx));
    for i in 0..100 {
        let resp = do_work(&tx, i).await;
        println!("work result for iteration {i}: {resp}");
    }
}
</code></pre>
