


<pre><code class="language-rust">
use rayon::prelude::*;
use std::time::Instant;

#[derive(Debug)]
struct Data{
    payload: i32,
}
#[derive(Debug)]
struct Nodes{
    data: Vec<Data>
}

let mut buf = vec![];
let numbers = 50_000_000;
for i in 0..numbers{
    buf.push(Data::new(1));
}
let mut nodes: Nodes = Nodes::new(buf);
let now = Instant::now();
algorithm(&mut nodes);
println!("Time #1:{} millis", now.elapsed().as_millis());

fn algorithm(nodes: &mut Nodes) -> i32{
    // 336 millis for 50 mln
    let mut sum = 0;
    for d in nodes.data.iter(){ sum+=d.payload;}
    sum 
    
    // 108 millis for 50 mln
    // nodes.data.par_iter_mut().map(|v|v.payload).reduce(||0,| a, b|{ a + b }) 
     
    // 209 millis for 50 mln
    // nodes.data.par_iter_mut().fold(||0_i32,|a, b| a + b.payload).sum::<i32>()

    // 528 millis for 50 mln
    nodes.data.iter().map(|v|v.payload).sum()   
}
</code></pre>
