


<pre><code class="language-rust">
use actix::prelude::*;
use std::time::Duration;
#[derive(Message)]
#[rtype(result = "()")]
struct Ping {
    pub id: usize,
}
// Actor definition
struct Game {
    counter: usize,
    name: String,
    recipient: Recipient<Ping>,
}
impl Actor for Game {
    type Context = Context<Game>;
}
// простой обработчик сообщений для сообщения Ping
impl Handler<Ping> for Game {
    type Result = ();
    fn handle(&mut self, msg: Ping, ctx: &mut Context<Self>) {
        self.counter += 1;
        if self.counter > 10 {
            System::current().stop();
        } else {
            println!("[{0}] Ping received {1}", self.name, msg.id);
            // wait 100 nanoseconds
            ctx.run_later(Duration::new(0, 100), move |act, _| {
                act.recipient.do_send(Ping { id: msg.id + 1 });
            });
        }
    }
}
fn main() {
    let mut system = System::new();
    // Чтобы получить объект Recipient, нам нужно использовать другой метод построителя что позволит отложить создание актера
    let addr = system.block_on(async {
        Game::create(|ctx| {
            // теперь мы можем получить адрес первого актера и создать второго актера
            let addr = ctx.address();
            let addr2 = Game {
                counter: 0,
                name: String::from("Game 2"),
                recipient: addr.recipient(),
            }
            .start();
            // давай начнем пинги
            addr2.do_send(Ping { id: 10 });
            // теперь мы наконец можем создать первого актера
            Game {
                counter: 0,
                name: String::from("Game 1"),
                recipient: addr2.recipient(),
            }
        });
    });
    system.run();
}
</code></pre>
