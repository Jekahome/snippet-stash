

Без надоюности собирать все JoinHandle и вызывать им join
<pre><code class="language-rust">
use std::{thread::{self,JoinHandle}};
use std::sync::{Arc, Mutex, MutexGuard, PoisonError}; 
use std::str::FromStr;
fn main(){
    let arc_mutex:Arc<Mutex<i32>> = Arc::new(Mutex::new(0));
    let mut handles:Vec<JoinHandle<()>> = Vec::new();
    for n_thread in 1..=10 {
        let mutex_clone:Arc<Mutex<i32>> = Arc::clone(&arc_mutex);
        thread::scope(|s| { 
           let scoped_h:thread::ScopedJoinHandle<'_,()> = thread::Builder::new()
                .name(format!("{n_thread}"))
                .spawn_scoped(s,move || {
                    // try_lock не ожидет получения блокировки Mutex
                    if let Ok(ref mut guard) = mutex_clone.try_lock(){
                        **guard += 1;
                    }
            }).unwrap();
        }); 
    }
    println!("{}",*arc_mutex.lock().unwrap()); // после thread::scope данные сразу доступны для развопачивания
}
</code></pre>
