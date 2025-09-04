


<pre><code class="language-rust">
// Executor System::block_on
fn main() {
    let sys = System::new();
    let addr = sys.block_on(async {
        let data = "86967897737416471853297327050364959
        11861322575564723963297542624962850
        70856234701860851907960690014725639
        38397966707106094172783238747669219
        52380795257888236525459303330302837
        58495327135744041048897885734297812
        69920216438980873548808413720956532
        16278424637452589860345374828574668";
        let chunked_data = data.split_whitespace();
        let count = 7;
      
        let addr_res = MyActorResult{
            sum:0,
            finish_len: count,
            state_len:0,
            start:Instant::now()
        }.start();
        
        let addr_task = MyActorTask {id:0,recipient: addr_res.clone().recipient() }.start();
    
        for (i, data_segment) in chunked_data.enumerate() {
            addr_task.do_send(TaskMessage{id:i,payload:data_segment.to_owned()});
        } 
        // stop system and exit
        //System::current().stop();
    });
    sys.run().unwrap();
}

// Executor Arbiter::spawn
fn _main() {
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

        let chunked_data = data.split_whitespace();
        let count = 7;
      
        let addr_res = MyActorResult{
            sum:0,
            finish_len: count,
            state_len:0,
            start:Instant::now()
        }.start();

        let addr_task = MyActorTask {id:0,recipient: addr_res.recipient()}.start();
        for (i, data_segment) in chunked_data.enumerate() {
            addr_task.do_send(TaskMessage{id:i,payload:data_segment.to_owned()});
        } 
    };
    Arbiter::current().spawn(execution);

    let _ = system.run(); 
}
</code></pre>

---
 
<pre><code class="language-rust">
// Executor System::block_on
fn _main() {
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
            start:Instant::now()
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
}
// Executor Arbiter::spawn
fn main() {
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
        let chunked_data = data.split_whitespace();
        let count = 8;
        // Получатель один в одном потоке и синхронный
        let addr_res = MyActorResult{
            sum:0,
            finish_len: 8,
            state_len:0,
            start:Instant::now(),
        }.start();
     
       let recipient = addr_res.clone().recipient();
       let addr_task = SyncArbiter::start(48, move|| MyActorTask {id:0,recipient: recipient.clone()});
       /*let addr_task = SyncArbiter::start_with_thread_builder(
        count, 
        move || std::thread::Builder::new().name("thread_1".into()).stack_size(2000000) ,
        move|| MyActorTask {id:0,recipient: addr_res.clone().recipient()});*/

        for (i, data_segment) in chunked_data.enumerate() {
            addr_task.do_send(TaskMessage{id:i,payload:data_segment.to_owned()});
        }
        //-----------------------------------------------------------------------------------------------------------
        /*for (i, data_segment) in chunked_data.enumerate() {
            let recipient =  addr_res.clone().recipient();
            //let addr_task = SyncArbiter::start(1, move|| MyActorTask {id:0,recipient: recipient.clone() });
            let addr_task = SyncArbiter::start_with_thread_builder(
                1, 
                move || std::thread::Builder::new().name(format!("thread_{}",i)).stack_size(2000000) ,
                move|| MyActorTask {id:0,recipient: recipient.clone()});
        
            addr_task.do_send(TaskMessage{id:i,payload:data_segment.to_owned()});
        }*/   
    };
    Arbiter::current().spawn(execution);
    let _ = system.run(); 
}
</code></pre>
