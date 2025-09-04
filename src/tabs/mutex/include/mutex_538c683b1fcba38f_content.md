


<pre><code class="language-rust">
use std::sync::{Mutex, Arc};
use std::thread;

// new() - создаем защищенный счет
let account = Arc::new(Mutex::new(1000)); // начальный баланс

let mut handles = vec![];

// Несколько потоков работают с счетом
for _ in 0..10 {
    let account = Arc::clone(&account);
    handles.push(thread::spawn(move || {
        // lock() - блокируем для безопасного доступа
        let mut balance = account.lock().unwrap();
        *balance += 100; // пополнение
        // автоматическая разблокировка
    }));
}

for handle in handles {
    handle.join().unwrap();
}

// into_inner() - забираем финальный результат
let final_balance = Arc::try_unwrap(account)
    .unwrap()
    .into_inner()
    .unwrap();
println!("Final balance: {}", final_balance); // 2000
</code></pre>
