


<pre><code class="language-rust">
use actix::prelude::*;
#[derive(Message)]
#[rtype(result = "Result<usize, std::io::Error>")]
struct Ping(usize);
// impl Message for Ping { type Result = Result<usize, std::io::Error>;}

struct MyActor {
    count: usize,
}
impl Actor for MyActor {
    type Context = Context<Self>;
    fn started(&mut self, ctx: &mut Context<Self>) {
        // Асинхронный актер может получить свой адрес из Context структуры. Контекст должен реализовать эту AsyncContext черту. AsyncContext::address() предоставляет адрес актера.
        let addr = ctx.address();
     }
     fn stopped(&mut self, ctx: &mut Context<Self>) {
        println!("Actor is stopped");
     }
}
impl Handler<Ping> for MyActor {
    type Result = Result<usize, std::io::Error>;

    fn handle(&mut self, msg: Ping, _: &mut Context<Self>) -> Self::Result {
        self.count += msg.0;
        Ok(self.count)
    }
}
#[actix::main]
async fn main() {
    let addr:Addr<MyActor> = MyActor::create(|ctx| {
        // теперь мы можем получить адрес первого актера
        let addr:Addr<MyActor> = ctx.address();

        // start new actor
        let my_actor = MyActor { count: 10 };
        my_actor
    });
    // или
    // start new actor
    //let addr = MyActor { count: 10 }.start();

    // send message and get future for result
    let res = addr.send(Ping(10)).await;

    // handle() returns tokio handle
    println!("RESULT: {}", res.unwrap().unwrap() == 20);

    // stop system and exit
    System::current().stop();
}
</code></pre>
