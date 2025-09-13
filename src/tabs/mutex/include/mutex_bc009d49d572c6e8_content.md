

```rust
use std::sync::{Mutex, Arc};
use std::thread;
use std::time::Duration;

fn main(){
    let data = Arc::new(Mutex::new(0));

    let data_clone = Arc::clone(&data);
    let producer = thread::spawn(move || {
        for i in 1..=5 {
            let mut lock = data_clone.lock().unwrap();
            *lock = i;
            thread::sleep(Duration::from_millis(100)); // имитация работы
        }
    });

    let consumer = thread::spawn(move || {
        while let Ok(lock) = data.try_lock() {
            // try_lock() - не блокируем поток если мьютекс занят
            if *lock == 5 { break; }
            println!("Current value: {}", *lock);
            thread::sleep(Duration::from_millis(50));
        }
        println!("Producer finished!");
    });

    producer.join().unwrap();
    consumer.join().unwrap();
}
```
