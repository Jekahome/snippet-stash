


<pre><code class="language-rust">
use std::thread;
use std::thread::JoinHandle;
use std::sync::{Arc, Mutex, MutexGuard, PoisonError}; 
fn main(){
    let arc_mutex:Arc<Mutex<i32>> = Arc::new(Mutex::new(0));
    let mut handles:Vec<JoinHandle<()>> = Vec::new();
    for _ in 0..10 {
        let mutex_clone:Arc<Mutex<i32>> = Arc::clone(&arc_mutex);
        let handle = thread::spawn(move || {
            // try_lock не ожидет получения блокировки Mutex
            if let Ok(ref mut guard) = mutex_clone.try_lock(){
                **guard += 1;
            }
           
            // lock ожидет получения блокировки т.е. блокирует текуший поток до получения возможности заблокировать Mutex
            let mut guard:MutexGuard<'_,i32> = mutex_clone.lock().unwrap();
            *guard += 1;
        });
        handles.push(handle);
    }
    for handle in handles {
        handle.join().unwrap();
    }
   println!("data:{}",*arc_mutex.lock().unwrap());

   let mut mutex:Mutex<i32> = Arc::into_inner(arc_mutex).unwrap();
    if !mutex.is_poisoned(){
        let ref_mutex:Result<&mut i32,PoisonError<_>> = mutex.get_mut();
        let data:&mut i32 = ref_mutex.unwrap();
        *data+=1;
    }
    println!("data:{}",mutex.into_inner().unwrap());
}
</code></pre>
