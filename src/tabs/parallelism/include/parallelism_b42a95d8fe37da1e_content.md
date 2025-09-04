


<pre><code class="language-rust">
use actix::prelude::*;
use actix::dev::{MessageResponse, OneshotSender};
#[derive(Message)]
#[rtype(result = "Responses")]
struct Ping(usize);
// impl Message for Ping { type Result = Responses;}

#[derive(PartialEq)]
enum Responses {
    Value(usize),
    NotValue,
}
impl<A, M> MessageResponse<A, M> for Responses
where
    A: Actor,
    M: Message<Result = Responses>,
{
    fn handle(self, ctx: &mut A::Context, tx: Option<OneshotSender<M::Result>>) {
        if let Some(tx) = tx {
            tx.send(self);
        }
    }
}
struct MyActor {
    count: usize,
}
impl Actor for MyActor {
    type Context = Context<Self>;
    fn started(&mut self, ctx: &mut Context<Self>) {
        println!("Actor is alive");
     }
     fn stopped(&mut self, ctx: &mut Context<Self>) {
        println!("Actor is stopped");
     }
}
impl Handler<Ping> for MyActor {
    type Result = Responses;

    fn handle(&mut self, msg: Ping, _: &mut Context<Self>) -> Self::Result {
        self.count += msg.0;
        Responses::Value(self.count)
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
    println!("RESULT: {}", res.unwrap() == Responses::Value(20));

    // stop system and exit
    System::current().stop();
}
</code></pre>
