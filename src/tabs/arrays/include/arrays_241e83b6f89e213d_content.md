


<pre><code class="language-rust">
fn main(){
    let mut arr:Vec<i32> = vec![1,2,3,4,5];
    let ptr:*mut Vec<i32> = &mut arr;
     
    let addr:usize = ptr as usize;
   
    let mut buff = vec![]; 
    let h1 = std::thread::spawn(move ||{
       let mut ptr2:*mut Vec<i32> = addr as *mut Vec<i32>;
       let mut arr2:&mut Vec<i32> = unsafe {&mut *ptr2};
       arr2[4]=9;
    });
    buff.push(h1);
    let h2 = std::thread::spawn(move ||{
       let mut ptr2:*mut Vec<i32> = addr as *mut Vec<i32>;
       let mut arr2:&mut Vec<i32> = unsafe {&mut *ptr2};
       arr2[3]=8;
    });
    buff.push(h2);
    for h in buff{
        h.join().unwrap();
    }
    assert_eq!(vec![1, 2, 3, 8, 9],arr);
}
</code></pre>

---
 
<pre><code class="language-rust">
fn main(){
    let mut arr:Vec<i32> = vec![1,1,1,1,1];
    let (left, right) = arr.split_at_mut(2);
    
    std::thread::scope(|s| {
        s.spawn(|| {
            left[0]=9;
        });
        s.spawn(|| {
           right[0]=8;
        });
    });
 
    assert_eq!(vec![9, 1, 8, 1, 1],arr);
    println!("{:?}",arr);// [9, 1, 8, 1, 1]
}
</code></pre>

Еще `split_as_mut`
<pre><code class="language-rust">
use crossbeam; // 0.8.2
fn main() {
    let mut vec: Vec<u32> = (0..10).collect();
    crossbeam::scope(|scope|{
        let (l,r):(&mut [u32],&mut [u32]) = vec.split_at_mut(5);
        scope.spawn(move |_| {
            l.reverse()
        });
        scope.spawn(move |_| {
            r.reverse()
        });
    });
    assert_eq!(vec![4, 3, 2, 1, 0, 9, 8, 7, 6, 5], vec);
}
}
</code></pre>

---

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
