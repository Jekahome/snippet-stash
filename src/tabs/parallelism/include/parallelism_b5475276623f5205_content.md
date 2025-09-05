


<pre><code class="language-rust">
use actix::prelude::*;
use std::time::{Instant};
struct MyActorTask {
    id:usize,
    recipient: Recipient<ResultMessage>
}
impl Actor for MyActorTask {
    type Context = SyncContext<Self>;
    fn started(&mut self, ctx: &mut SyncContext<Self>) {
        //println!("MyActorTask started");
    }
}
#[derive(Message)]
#[rtype(result = "()")]
struct TaskMessage{id:usize,payload:String}

impl Handler<TaskMessage> for MyActorTask {
    type Result = ();
    fn handle(&mut self, msg: TaskMessage, _ctx: &mut SyncContext<Self>) -> Self::Result {
        //let thread:std::thread::Thread = std::thread::current(); println!("{:?}",thread.name());
        let result:usize = msg.payload
        .chars()
        .map(|c| c.to_digit(10).expect("should be a digit") as usize)
        .sum();
        std::thread::sleep(std::time::Duration::from_secs(1));
        let _ = self.recipient.do_send(ResultMessage{id:msg.id,sum:result});
    }
}
//------------------------------------------------------
struct MyActorResult {
    sum: usize,
    finish_len: usize,
    state_len: usize,
    start:Instant,
    tx:Option<tokio::sync::oneshot::Sender<usize>>
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
    sum:usize
}
#[derive(Message,Debug)]
#[rtype(result = "usize")]
struct TotalResultMessage;
impl Handler<ResultMessage> for MyActorResult {
    type Result = ();
    fn handle(&mut self, msg: ResultMessage, _ctx: &mut Context<Self>) -> Self::Result {
        println!("{:?}",&msg);
        self.sum+=msg.sum;
        self.state_len+=1;
        if self.state_len==self.finish_len{
           println!("MyActorResult is stopped Millis:{}",self.start.elapsed().as_millis());// Millis:1000
           let sender = std::mem::take(&mut self.tx).unwrap();
           sender.send(self.sum);
           System::current().stop();  
        }  
    }
}
// Executor System::block_on
fn main() {
    let (tx, rx) = tokio::sync::oneshot::channel();
    let mut rx = Some(rx);
    std::thread::spawn(||{
        let system = System::new();
        
        let execution = async {
            let data = "86967897737416471853297327050364959
            11861322575564723963297542624962850
            70856234701860851907960690014725639
            38397966707106094172783238747669219
            52380795257888236525459303330302837
            58495327135744041048897885734297812
            69920216438980873548808413720956532
            16278424637452589860345374828574668";

            let addr_res = MyActorResult{
                sum:0,
                finish_len: 8,
                state_len:0,
                start:Instant::now(),
                tx:Some(tx)
            }.start();

            let chunked_data = data.split_whitespace();
            let count = 8;

            let recipient = addr_res.clone().recipient();
            let addr_task = SyncArbiter::start(48, move|| MyActorTask {id:0,recipient: recipient.clone()});
            for (i, data_segment) in chunked_data.enumerate() {
                addr_task.do_send(TaskMessage{id:i,payload:data_segment.to_owned()});
            }
        };
        system.block_on(execution);
        
        let _ = system.run(); 
    }).join();

    println!("=====================================");
    let system = System::new();
    system.block_on(async move{
        let receiver = std::mem::take(&mut rx).unwrap();
        println!("{:?}",receiver.await);
        System::current().stop();  
    });
    let _ = system.run(); 
}
</code></pre>
