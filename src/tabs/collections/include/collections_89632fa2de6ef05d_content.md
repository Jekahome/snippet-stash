


<pre><code class="language-rust">
#[macro_use] // для vector![1, 2, 3, 4, 5];
extern crate im;
use im::vector::Vector;
use std::time::{Duration, Instant};

fn main() {
    let mut s: usize = 100000000;
    let mut vec: Vector<i32> = Vector::new();
    im_vector_remove(&mut s, &mut vec);
}

//push_front 13
//push_back 13
fn im_vector_add(s:&mut usize,vec:&mut Vector<i32>){
let now = Instant::now();
    while *s > 0 {
        *s-=1;
       //vec.push_back(1);
       vec.push_front(1);
    }
    println!("{}", now.elapsed().as_secs());
}
// pop_front 13
//pop_back 14
fn im_vector_remove(s:&mut usize,vec:&mut Vector<i32>){
        let mut ss = s.clone();
        while *s > 0 {
                *s-=1;
                vec.push_back(1);
        }
        let now = Instant::now();
        while ss > 0 {
                ss-=1;
                 vec.pop_front().unwrap();
                //vec.pop_back().unwrap();
        }
        println!("{}", now.elapsed().as_secs());
}
</code></pre>
