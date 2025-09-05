

<pre><code class="language-rust">
extern crate crossbeam;// [dependencies] crossbeam = "0.3.2"
fn crossbeam_data(){
    let data = "86967897737416471853297327050364959
11861322575564723963297542624962850
70856234701860851907960690014725639
38397966707106094172783238747669219
52380795257888236525459303330302837
58495327135744041048897885734297812
69920216438980873548808413720956532
16278424637452589860345374828574668";
    let chunked_data = data.split_whitespace();
    let mut data:u32 = 0;
    for (i, data_segment) in chunked_data.enumerate() {
        crossbeam::scope(|scope_| {
            let mut data_mut:&mut u32 = &mut data;
                scope_.spawn(move || {
                    let result:u32 = data_segment
                        .chars()
                        .map(|c| c.to_digit(10).expect("should be a digit"))
                        .sum();

                    *data_mut += result;
                })
        });
    }
    println!("Result: {:?}", data);
}
</code></pre>
