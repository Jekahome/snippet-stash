


<pre><code class="language-rust">
use std::sync::Arc;
use std::cell::UnsafeCell;
use std::marker::Sync;

#[derive(Debug)]
struct NotThreadSafe<T> {
    value: UnsafeCell<Vec<T>>,
}
unsafe impl<T> Sync for NotThreadSafe<T> {}

impl<T> NotThreadSafe<T> {
    fn new(v:Vec<T>)->Self{
       NotThreadSafe{value:UnsafeCell::new(v)}
    }
}
fn main() {
     let v = Arc::new(NotThreadSafe::new(vec![1;5]));
     let mut buff = vec![]; 
     let v_clone_1 = Arc::clone(&v);
     let v_clone_2 = Arc::clone(&v);
     let h1 = std::thread::spawn( move ||{
        let data:*mut Vec<i32> = v_clone_1.value.get();
        if !data.is_null(){
            unsafe{
               let data_vec:&mut Vec<i32> = &mut *data;
               data_vec[4]=9;
            }
        } 
    });
    buff.push(h1);
        let h2 = std::thread::spawn( move ||{
        let data:*mut Vec<i32> = v_clone_2.value.get();
        if !data.is_null(){
            unsafe{
               let data_vec:&mut Vec<i32> = &mut *data;
               data_vec[3]=8;
            }
        } 
    });
    buff.push(h2);
    for h in buff{
        h.join().unwrap();
    }
    
    let mut data = v.value.get();
    if !data.is_null(){
        unsafe{
           let data_vec:&Vec<i32> = &*data;
           println!("{:?}",data_vec);
           assert_eq!(vec![1, 1, 1, 8, 9],data_vec.clone());
        }
    } 
}
</code></pre>
