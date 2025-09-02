

<pre><code class="language-rust">
use rayon::prelude::*;
fn main(){
    let mut array = [1, 2, 3, 4, 5];
    array.par_chunks_mut(2)
       .for_each(|slice| slice.reverse());
    assert_eq!(array, [2, 1, 4, 3, 5]);
}
</code></pre>
