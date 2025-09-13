

```
use std::thread;
use std::sync::mpsc;

fn channel_data(){
    let data = "86967897737416471853297327050364959
11861322575564723963297542624962850
70856234701860851907960690014725639
38397966707106094172783238747669219
52380795257888236525459303330302837
58495327135744041048897885734297812
69920216438980873548808413720956532
16278424637452589860345374828574668";
    let chunked_data = data.split_whitespace();
    let mut lenght:i32=0;// количество ответов Sender
    let (tx, rx): (Sender<u32>, Receiver<u32>) = mpsc::channel::<u32>();
    for (i, data_segment) in chunked_data.enumerate() {
        let  tx_ = mpsc::Sender::clone(&tx);
        lenght+=1;
       thread::spawn(move || {
           println!("data segment {} is \"{}\"", i, data_segment);
            let result = data_segment
                .chars()
                .map(|c| c.to_digit(10).expect("should be a digit"))
                .sum();
            println!("processed segment {}, result={}", i, result);
           tx_.send(result).unwrap();
        });
    }
    let mut intermediate_sums = vec![];
    for child in (0..lenght) {
        intermediate_sums.push(rx.recv().unwrap());
    }
    let final_result = intermediate_sums.iter().sum::<u32>();
    println!("Final sum result: {}", final_result);
}
```
