

File benches/sample.rs:
<pre><code class="language-rust">
#![feature(test)]   // #[bench] is still experimental
extern crate test; 
                
use test::{black_box, Bencher};

#[bench]
fn my_algo(b: &mut Bencher) {
    b.iter(|| black_box(my_crate::f())); // `black_box` prevents `f` from being optimized away.
}
</code></pre>
