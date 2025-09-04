


<pre><code class="language-rust">
use std::sync::{Arc, RwLock};
use std::thread;
use std::sync::mpsc::{Receiver,Sender};
fn main() {
    let (tx, rx): (Sender<()>, Receiver<()>) = std::sync::mpsc::channel();
    let mut v:Vec<i32> = vec![1,2,3,4];
    let rwlock = Arc::new(RwLock::new(v));

    for i in 0..4 {
        let (c_rwlock, tx) = (Arc::clone(&rwlock), tx.clone());
         
        thread::spawn(move || {
            if let Ok(mut n) = c_rwlock.try_write() {
                n[i]+=10;
            };
            tx.send(());
        });
    }

    //thread::sleep_ms(50);
    for _ in 0..4 {     
       rx.recv();       
    }

    if rwlock.is_poisoned() == false{
      println!("{:?}",*rwlock.try_read().unwrap());
    }
   /* match rwlock.try_read() {
        Ok(n) => println!("{:?}",*n), // [11, 12, 13, 14]
        Err(_) =>println!(""),
    };*/
}
</code></pre>
