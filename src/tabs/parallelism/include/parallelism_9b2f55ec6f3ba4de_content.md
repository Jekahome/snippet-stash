


<pre><code class="language-rust">
async fn calculate(data_segment:&str) -> usize{
    let result:usize = data_segment
    .chars()
    .map(|c| c.to_digit(10).expect("should be a digit") as usize)
    .sum();
    result
}

#[tokio::main]
async fn main(){
    let mut handlers:Vec<tokio::task::JoinHandle<usize>> = vec![];
    let mut sum = 0usize;
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
        handlers.push(tokio::spawn(async move {
            calculate(data_segment).await
        }));
    }

    for h in handlers.into_iter(){
        sum+=h.await.unwrap();
    }
    assert_eq!(sum,1342);
}
</code></pre>
