

```
use std::sync::{Arc, Mutex};
fn mutex_data(){
    let data = "86967897737416471853297327050364959
11861322575564723963297542624962850
70856234701860851907960690014725639
38397966707106094172783238747669219
52380795257888236525459303330302837
58495327135744041048897885734297812
69920216438980873548808413720956532
16278424637452589860345374828574668";
    let chunked_data = data.split_whitespace();
    let mut res:u32=0;// общая разделяемая память
    let data = Arc::new(Mutex::new(res));
    let mut sync_vec:Vec<thread::JoinHandle<_>> = vec![];
    for (i, data_segment) in chunked_data.enumerate() {
        let  data  = Arc::clone(&data) ;
        sync_vec.push(  thread::spawn(move || {
            println!("data segment {} is \"{}\"", i, data_segment);
            let result:u32 = data_segment
                .chars()
                .map(|c| c.to_digit(10).expect("should be a digit"))
                .sum();
            println!("processed segment {}, result={}", i, result);
            let mut data = data.lock();
            match data {
                Ok( mut _data) => { *_data += result;  },
                Err(_e) => {}
            }
        }));
    }
     // для синхронизации потоков, проходимся по всем потокам
    for i in sync_vec{
        i.join();
    }
    // берем результат с разделяемой памяти    
    println!("Result: {}", *data.lock().unwrap());
    if let Ok(res) = Arc::try_unwrap(data){
        match res.into_inner() {
            Ok(_data) => { println!("Final sum result: {}", _data); },
            Err(e) => {  println!("Final sum result: {}", e ); }
        }
    }
}
```
