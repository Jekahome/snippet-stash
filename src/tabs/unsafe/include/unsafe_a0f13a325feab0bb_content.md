


<pre><code class="language-rust">
fn main(){
     let mut arr:Vec<i32> = vec![1,2,3,4,5];
     let ptr:*mut Vec<i32> = &mut arr;
     
     let addr:usize = ptr as usize;
     
     let mut ptr2:*mut Vec<i32> = addr as *mut Vec<i32>;
     let mut arr2:&mut Vec<i32> = unsafe {&mut *ptr2};
     arr2[4]=9;
     println!("{:?}",arr);
     assert_eq!(arr,*arr2);
}
</code></pre>

----

так можно передать `mut Vec<T>` в многопоточную среду
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
