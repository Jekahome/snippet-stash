


<pre><code class="language-rust">
use std::cell::UnsafeCell;
use std::marker::Sync;

#[derive(Debug)]
struct NotThreadSafe<T> {
    value: UnsafeCell<T>,
}

unsafe impl<T> Sync for NotThreadSafe<T> {}

impl<T> NotThreadSafe<T> {
    fn new(v:T)->Self{
      NotThreadSafe{value:UnsafeCell::new(v)}
    }
}
fn main() {
     let v = NotThreadSafe::new(5_i32);
    
     //let data_i32:i32 = v.value.into_inner();
     //assert_eq!(5,data_i32);
     
     let data = v.value.get();
      if !data.is_null(){
       unsafe{
           let data_i32:i32 = *data;
           assert_eq!(5,data_i32);
       }
}}
</code></pre>
