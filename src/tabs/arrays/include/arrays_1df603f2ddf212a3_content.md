


<pre><code class="language-rust">
use rayon::prelude::*;
fn main(){
    let mut v = vec![3, 2, 90, 78, 64, 32, 1, -10, 10, 10000];
    v.par_sort();
    println!("{:?}", v);
}
</code></pre>
