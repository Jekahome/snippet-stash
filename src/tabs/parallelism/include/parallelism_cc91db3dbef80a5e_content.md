


<pre><code class="language-rust">
use std::sync::mpsc::channel;
fn main(){
    let pool = rayon::ThreadPoolBuilder::new().num_threads(8).build().unwrap();
    let (tx, rx) = channel();

    let data = "86967897737416471853297327050364959
    11861322575564723963297542624962850
    70856234701860851907960690014725639
    38397966707106094172783238747669219
    52380795257888236525459303330302837
    58495327135744041048897885734297812
    69920216438980873548808413720956532
    16278424637452589860345374828574668";
   
    let chunked_data = data.split_whitespace();
    for (i, data_segment) in chunked_data.enumerate() {
        let tx = tx.clone();
        pool.spawn(move|| { 
            let result:usize = data_segment
            .chars()
            .map(|c| c.to_digit(10).expect("should be a digit") as usize)
            .sum();
            tx.send(result).expect("channel will be there waiting for the pool");
        });
    }
    assert_eq!(rx.iter().take(8).fold(0, |a, b| a + b), 1342);
}
</code></pre>
