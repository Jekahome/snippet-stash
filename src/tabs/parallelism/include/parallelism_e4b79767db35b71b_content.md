


<pre><code class="language-rust">
use std::thread;
use std::sync::Arc;
fn main() {
    let data = Arc::new(42); // Оборачиваем в Arc для разделяемого доступа
    let data_ptr = Arc::into_raw(data) as *mut i32; // Преобразуем в указатель

    // Создаем два потока, которые обращаются к одной и той же памяти
    let handle1 = thread::spawn(move || {
        unsafe {
            *data_ptr += 1; // Поток 1 изменяет значение
        }
    });

    let handle2 = thread::spawn(move || {
        unsafe {
            *data_ptr += 1; // Поток 2 изменяет значение
        }
    });

    handle1.join().unwrap();
    handle2.join().unwrap();

    // Освобождаем память
    unsafe {
        drop(Arc::from_raw(data_ptr)); // Преобразуем обратно в Arc, чтобы вызвать drop
    }
    println!("Программа завершена.");
}
</code></pre>
