

<pre><code class="language-rust">
use std::sync::{Arc, Mutex, Condvar};
use std::thread;
fn main(){
    let pair:Arc<(Mutex<bool>,Condvar)> = Arc::new((Mutex::new(false), Condvar::new()));
    let pair2 = Arc::clone(&pair);

    // Внутри нашей блокировки создайте новый поток и дождитесь его запуска.
    thread::spawn(move|| {
        let (lock, cvar) = &*pair2;
        let mut started = lock.lock().unwrap();
        *started = true;
        println!("1");
        thread::sleep(std::time::Duration::from_millis(1000));
        // Мы уведомляем condvar о том, что значение изменилось.
        cvar.notify_one();
        println!("2");
    });

    let (lock, cvar) = &*pair;
    let mut started:MutexGuard<'_,bool> = lock.lock().unwrap();
    while !*started {
        started = cvar.wait(started).unwrap(); // Подождите, пока поток запустится.
        println!("3");
    }
}
</code></pre>
