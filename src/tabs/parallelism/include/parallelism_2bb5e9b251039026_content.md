


<pre><code class="language-rust">
use ryan::prelude::*;

// Определим сообщение
struct MyMessage(String);

// Определим актера, который будет обрабатывать сообщения
struct MyActor;

impl Actor for MyActor {
    type Msg = MyMessage;

    fn receive(&mut self, msg: Self::Msg) {
        println!("Received message: {}", msg.0);
    }
}

fn main() {
    // Создаем актера
    let actor = MyActor;

    // Создаем систему акторов
    let system = ActorSystem::new();

    // Запускаем актера в системе
    let actor_handle = system.spawn(actor);

    // Отправляем сообщение актору
    actor_handle.send(MyMessage("Hello, world!".to_string()));

    // Завершаем выполнение системы
    system.shutdown().unwrap();
}
</code></pre>
