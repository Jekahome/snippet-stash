


<pre><code class="language-rust">
use std::collections::HashMap;

#[derive(Clone,Copy,Debug)]
struct Matrix{
    pub size:usize,

}
impl Matrix {
    fn new(size:usize  )->Self{
        Self{size }
    }
}
fn main(){
    let raw = vec![1; 9000000];

    let now = Instant::now();
    let mut buf_matrix: HashMap<usize, Matrix> = HashMap::new();
    for (index,v) in  raw.iter().enumerate() {
        buf_matrix.insert( index, Matrix::new(index));
    }
    println!("Time Only Hash ={}s\n", now.elapsed().as_secs());// 10 sec

    let now = Instant::now();
    let mut buf_matrix:Vec<(usize,Matrix)> = Vec::new();
    for (index,v) in  raw.iter().enumerate() {
        buf_matrix.push((index, Matrix::new(index)));
    }
    //buf_matrix.sort_unstable_by(|a, b| a.0.cmp(&b.0));
     let buf_matrix: HashMap<usize, Matrix> = buf_matrix
        .iter()
        .map(|t|t.0)
        .zip(buf_matrix.iter().map(|t|t.1))
        .collect::<HashMap<usize, Matrix>>();
     println!("Time Vec to Hash ={}s\n", now.elapsed().as_secs());// 6 sec

     for (k,v) in buf_matrix.iter().take(5){
          println!("k={} v={}", k,v.size);
      }
     println!("len={}", buf_matrix.len());

}
</code></pre>
