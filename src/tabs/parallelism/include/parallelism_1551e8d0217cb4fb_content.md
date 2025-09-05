


<pre><code class="language-rust">
#[macro_use]
extern crate crossbeam_channel;// лучьше производительность чем у std::sync::mpsc::channel

fn crossbeam_channel_data(){
    let data = "86967897737416471853297327050364959
11861322575564723963297542624962850
70856234701860851907960690014725639
38397966707106094172783238747669219
52380795257888236525459303330302837
58495327135744041048897885734297812
69920216438980873548808413720956532
16278424637452589860345374828574668";

    let chunked_data = data.split_whitespace();
    let mut lenght:i32=0;
    let (tx, rx): (crossbeam_channel::Sender<u32>, crossbeam_channel::Receiver<u32>) = crossbeam_channel::unbounded();
    for (i, data_segment) in chunked_data.enumerate() {
        let  tx_ =  tx.clone();
        lenght+=1;

        thread::spawn(move || {
            println!("data segment {} is \"{}\"", i, data_segment);
            let result = data_segment
                .chars()
                .map(|c| c.to_digit(10).expect("should be a digit"))
                .sum();
            println!("processed segment {}, result={}", i, result);
            tx_.send(result);
        });
    }
    
    let mut intermediate_sums = vec![];
    for child in (0..lenght) {
        intermediate_sums.push(rx.recv().unwrap());
    }

    let final_result = intermediate_sums.iter().sum::<u32>();
    println!("Final sum result: {}", final_result);
}
</code></pre>
