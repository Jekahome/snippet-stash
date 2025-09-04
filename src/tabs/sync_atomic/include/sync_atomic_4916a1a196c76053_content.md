


<pre><code class="language-rust">
use std::sync::atomic::AtomicUsize;
fn main() {
    let num_done = AtomicUsize::new(0);
    thread::scope(|s| {
        // Фоновый поток для обработки всех 100 элементов.
        s.spawn(|| {
            for i in 0..100 {
                process_item(i); // Assuming this takes some time.
                num_done.store(i + 1, Relaxed);
            }
        });
        // В основной теме каждую секунду отображаются обновления статуса.
       // т.е. будет выведено много дублей текущего состояния num_done пока не обновиться до нового состояния !!!
        loop {
            let n = num_done.load(Relaxed);
            if n >= 100 { break; }
            println!("Working.. {n}/100 done");
            thread::sleep(std::time::Duration::from_millis(1));
        }
    });
    println!("Done!");
}
fn process_item(n:usize){}
</code></pre>


После обработки последнего элемента может потребоваться до одной целой секунды, чтобы основной поток узнал об этом, что приводит к ненужной задержке в конце. Чтобы решить эту проблему, мы можем использовать парковку потоков чтобы вывести основной поток из состояния сна всякий раз, когда появляется новая информация, которая может его заинтересовать.
<pre><code class="language-rust">
fn main() {
    let num_done = AtomicUsize::new(0);
    let main_thread = thread::current();
    thread::scope(|s| {
        // Фоновый поток для обработки всех 100 элементов.
        s.spawn(|| {
            for i in 0..100 {
                process_item(i); // Если предположить, что это займет некоторое время.
                num_done.store(i + 1, Relaxed);
                main_thread.unpark(); // Разбудите основной поток.
            }
        });
        // В основной теме отображаются обновления статуса.
        loop {
            let n = num_done.load(Relaxed);
            if n == 100 { break; }
            println!("Working.. {n}/100 done");
            thread::park_timeout(Duration::from_secs(1));// если 1 сек пройдет до снятия unpark то он снова покажет прошлое значение
        }
    });
    println!("Done!");
}
</code></pre>
