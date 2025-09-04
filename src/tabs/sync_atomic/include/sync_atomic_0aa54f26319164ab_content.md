

**fence** используется для создания синхронизации между операциями на уровне атомарных операций. Это позволяет разработчикам контролировать порядок выполнения операций в многопоточной среде и обеспечивает дополнительные гарантии для предотвращения нежелательных оптимизаций компилятора и процессора.
<pre><code class="language-rust">
use std::sync::atomic::{AtomicBool, fence, Ordering};
use std::thread;
use std::sync::Arc;
fn main() {
    let flag = Arc::new(AtomicBool::new(false));
    let flag_clone = Arc::clone(&flag);
    // Поток 1
    let thread1 = thread::spawn(move || {
        // Выполнение какой-то работы
        flag_clone.store(true, Ordering::Release);
        fence(Ordering::Release); // Обеспечиваем порядок записи
    });
    // Поток 2
    let thread2 = thread::spawn(move || {
        fence(Ordering::Acquire); // Обеспечиваем порядок чтения
        if flag.load(Ordering::Acquire) {
            println!("Flag was set!");
        }
    });
    thread1.join().unwrap();
    thread2.join().unwrap();
}
</code></pre>
