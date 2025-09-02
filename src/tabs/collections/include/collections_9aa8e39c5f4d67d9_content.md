


<pre><code class="language-rust">
use std::time::{Duration, Instant};
use std::collections::LinkedList;
fn linked_remove(s:&mut usize,vec:&mut LinkedList<i32>){
    let mut ss = s.clone();
    while *s > 0 {
        *s-=1;
        vec.push_front(1);
    }
    let now = Instant::now();
    while ss > 0 {
        ss-=1;
        //vec.pop_front().unwrap();
        vec.pop_back().unwrap();
    }
    println!("{}", now.elapsed().as_secs());
}
fn main(){
   let mut vec:LinkedList<i32> = LinkedList::new();
   linked_remove(&mut s,&mut vec);
}
</code></pre>
