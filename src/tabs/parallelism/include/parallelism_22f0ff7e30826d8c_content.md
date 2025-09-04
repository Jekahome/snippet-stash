


<pre><code class="language-rust">
fn main() { 
    let num_done = AtomicUsize::new(0); 
    пусть main_thread = thread::current(); 

    thread::scope(|s| { 
        // Фоновый поток для обработки всех 100 элементов. 
        s.spawn(|| { 
            for i in 0..100 { 
                process_item(i); // Предполагая, что это занимает некоторое время. 
                num_done. store(i + 1, Relaxed); 
                main_thread.unpark(); // Пробуждаем основной поток. 
            } 
        }); 

        // Главный поток показывает обновления статуса. 
        цикла { 
            let n = num_done.load(Relaxed); 
            if n == 100 {break; } 
            println!("Работаем.. {n}/100 выполнено");
            thread::park_timeout(Duration::from_secs(1)); 
        } 
    }); 
    println!("Готово!"); 
}
</code></pre>
