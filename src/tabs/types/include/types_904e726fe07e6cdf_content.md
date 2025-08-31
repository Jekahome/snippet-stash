



Макрос упаковывает любое количество статических объявлений и делает их локальными для потока. 
<pre><code class="language-rust">
use std::cell::RefCell;
thread_local! {
    pub static FOO: RefCell<u32> = RefCell::new(1);
    static BAR: RefCell<f32> = RefCell::new(1.0);
}

FOO.with(|foo| assert_eq!(*foo.borrow(), 1));
BAR.with(|bar| assert_eq!(*bar.borrow(), 1.0));
</code></pre>

---

Эта библиотека предоставляет ThreadLocal тип, который позволяет использовать отдельную копию объекта для каждого потока. 
Это позволяет использовать локальное хранилище потока для каждого объекта, в отличие от макроса стандартной библиотеки, `thread_local!` который допускает только статическое локальное хранилище потока.
<pre><code class="language-rust">
use thread_local::ThreadLocal;
use std::sync::Arc;
use std::cell::Cell;
use std::thread;

let tls = Arc::new(ThreadLocal::new());

// Create a bunch of threads to do stuff
for _ in 0..5 {
    let tls2 = tls.clone();
    thread::spawn(move || {
        // Increment a counter to count some event...
        let cell = tls2.get_or(|| Cell::new(0));
        cell.set(cell.get() + 1);
    }).join().unwrap();
}
fn main(){
    // После завершения всех потоков соберите значения счётчиков и верните 
    // сумму всех локальных значений счётчиков потока.
    let tls = Arc::try_unwrap(tls).unwrap();
    let total = tls.into_iter().fold(0, |x, y| x + y.get());
    assert_eq!(total, 5);
}
</code></pre>
