

Проблема отравления блокировок

Вызовы unwrap() в приведенных выше примерах связаны с проблемой отравления блокировок.

Mutex в Rust помечается как отравленный, когда поток вызывает панику, удерживая блокировку. Когда это происходит, Mutex больше не будет заблокирован, но вызов его метода lock приведет к возврату Err, чтобы указать, что он был отравлен.

Это механизм для защиты от оставления данных, защищенных mutex, в непоследовательном состоянии. В приведенном выше примере, если поток вызовет панику после увеличения целого числа менее чем на 100, mutex разблокируется, и целое число останется в неожиданном состоянии, где оно больше не является кратным 100, что может нарушить предположения других потоков. Автоматическая пометка mutex как отравленного в таком случае заставляет пользователя обработать эту возможность.

Вызов lock() на отравленном mutex все равно заблокирует mutex. Err, возвращаемый lock(), содержит MutexGuard, что позволяет нам при необходимости исправить непоследовательное состояние.

Хотя отравление блокировок может казаться мощным механизмом, на практике восстановление из потенциально непоследовательного состояния не всегда осуществляется. Большинство кода либо игнорирует отравление, либо использует unwrap(), чтобы вызвать панику, если блокировка была отравлена, тем самым эффективно распространяя паники на всех пользователей mutex.
<pre><code class="language-rust">
use std::thread;
use std::thread::JoinHandle;
use std::sync::{Arc, Mutex, MutexGuard, PoisonError}; 
use std::str::FromStr;
fn main(){
    let arc_mutex:Arc<Mutex<i32>> = Arc::new(Mutex::new(0));
    let mut handles:Vec<JoinHandle<()>> = Vec::new();

    for n_thread in 1..=10 {
        let mutex_clone:Arc<Mutex<i32>> = Arc::clone(&arc_mutex);
        let handle:JoinHandle<()> = thread::Builder::new()
             .name(format!("{n_thread}"))
             .spawn(move || {
                let id:i32 = i32::from_str(thread::current().name().unwrap()).unwrap();
                if id%2 == 0{
                    panic!("value is a multiple of 2");
                }

                // try_lock не ожидет получения блокировки Mutex
                if let Ok(ref mut guard) = mutex_clone.try_lock(){
                    **guard += 1;
                }
            
                // lock ожидет получения блокировки т.е. блокирует текуший поток до получения возможности заблокировать Mutex
                //let mut guard:MutexGuard<'_,i32> = mutex_clone.lock().unwrap();
                // *guard += 1;

        }).unwrap();
        handles.push(handle);
    }
    for handle in handles {
        if let Ok(_) = handle.join(){

        }
    }
    println!("data:{}",*arc_mutex.lock().unwrap());

    println!("{}",*arc_mutex.lock().unwrap());
    let mut mutex:Mutex<i32> = Arc::into_inner(arc_mutex).unwrap();
    if !mutex.is_poisoned(){
        let ref_mutex:Result<&mut i32,PoisonError<_>> = mutex.get_mut();
        let data:&mut i32 = ref_mutex.unwrap();
        *data+=1;
    }
    println!("data:{}",mutex.into_inner().unwrap());
}
</code></pre>
