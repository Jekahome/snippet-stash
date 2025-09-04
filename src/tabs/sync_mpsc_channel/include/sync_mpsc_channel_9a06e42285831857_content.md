


<pre><code class="language-rust">
use std::sync::mpsc::{Sender, Receiver};
use std::sync::mpsc;
use std::thread;

static NTHREADS: i32 = 3;
fn main() {
    // Каналы имеют две конечные точки: `Sender <T>` и `Receiver <T>`, где `T` - тип передаваемого сообщения
    let (tx, rx): (Sender<i32>, Receiver<i32>) = mpsc::channel();
    for id in 0..NTHREADS {
        let thread_tx = tx.clone();// Конечную точку отправителя можно скопировать
        if id%2==0{continue;} // для проверки ожидания Receiver всех отработанных Sender
        // Каждый поток будет отправлять свой идентификатор через канал
        thread::spawn(move || {
            //Поток берет на себя ответственность за `thread_tx`
            //  Каждый поток ставит в очередь сообщение в канале
            // `send` не блокирует поток
            thread_tx.send(id).unwrap();

            // Отправка является неблокирующей операцией, поток будет продолжаться
            // сразу после отправки своего сообщенияe
            println!("thread {} finished", id);
        });
    }

    // Если не удалить sender то receiver будет ждать, пока все senders завершат свою отправку
    // исходный receiver никогда не отбрасывается, так что receiver ждет вечно
    // Канал считается закрытым , если либо передающая, либо принимающая его половина уничтожена.
    std::mem::drop(tx);

    // Здесь собраны все сообщения
    let mut ids = Vec::with_capacity(NTHREADS as usize);
    for _ in 0..NTHREADS {
        // Метод `recv` забирает сообщение из канала
        //  `recv` блокирует текущий поток, если сообщений нет
        ids.push(rx.recv());
    }

    println!("{:?}", ids);  //Показывать порядок отправки сообщений
}
</code></pre>
