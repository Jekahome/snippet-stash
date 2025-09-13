

```
use actix::prelude::*;
use std::time::{Instant};
struct MyActorTask {
    id:usize,
    //data:String,
    recipient: Recipient<ResultMessage>
}
impl Actor for MyActorTask {
    type Context = Context<Self>;
    fn started(&mut self, ctx: &mut Context<Self>) {
        println!("MyActorTask started");
    }
}
#[derive(Message)]
#[rtype(result = "()")]
struct TaskMessage{id:usize,payload:String}
impl Handler<TaskMessage> for MyActorTask {
    type Result = ();
    fn handle(&mut self, msg: TaskMessage, _ctx: &mut Context<Self>) -> Self::Result {
        let result:usize = msg.payload
        .chars()
        .map(|c| c.to_digit(10).expect("should be a digit") as usize)
        .sum();
         std::thread::sleep(std::time::Duration::from_secs(1));
        let _ = self.recipient.do_send(ResultMessage{id:msg.id,sum:result});
    }
}
```

---
 
```
struct MyActorResult {
    sum: usize,
    finish_len: usize,
    state_len: usize,
    start:Instant
}
impl Actor for MyActorResult {
    type Context = Context<Self>;
    fn stopped(&mut self, ctx: &mut Context<Self>) {
        println!("MyActorResult:{}",self.sum);
    }
}
#[derive(Message,Debug)]
#[rtype(result = "()")]
struct ResultMessage{
    id:usize,
    sum:usize,
}
impl Handler<ResultMessage> for MyActorResult {
    type Result = ();

    fn handle(&mut self, msg: ResultMessage, _ctx: &mut Context<Self>) -> Self::Result {
        println!("{:?}",&msg);
        self.sum+=msg.sum;
        self.state_len+=1;

        if self.state_len==self.finish_len{
           println!("MyActorResult is stopped Millis:{}",self.start.elapsed().as_millis());// Millis:8002
           System::current().stop();  
        }  
    }
}
```

