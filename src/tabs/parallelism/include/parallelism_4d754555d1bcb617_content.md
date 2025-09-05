


<pre><code class="language-rust">
use rayon::prelude::*; 
use std::sync::mpsc::channel;
fn main(){
    let (sender, receiver) = channel();
    let data = "86967897737416471853297327050364959
    11861322575564723963297542624962850
    70856234701860851907960690014725639
    38397966707106094172783238747669219
    52380795257888236525459303330302837
    58495327135744041048897885734297812
    69920216438980873548808413720956532
    16278424637452589860345374828574668";
    
    let chunked_data = data.par_split_whitespace();
     
    chunked_data.for_each_with(sender,|s,row|{
        let result:usize = row.to_owned()
            .chars()
            .map(|c| c.to_digit(10).expect("should be a digit") as usize)
            .sum();
        s.send(result).unwrap()
    }); 
    let mut res: Vec<usize> = receiver.iter().collect();
     
    let RESULT:usize = res.into_iter().sum();
    assert_eq!(RESULT,1342_usize);
}
</code></pre>
