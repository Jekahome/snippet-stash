

Идеальные use cases для notify_all():
* Graceful shutdown — остановка всех потоков
* Запуск группы потоков — одновременный старт, когда работу должны выполнить все потоки
* Изменение конфигурации — все потоки должны узнать об изменении
* Барьеры синхронизации — когда все потоки достигли точки
* Глобальные события — события которые касаются всех потоков


<pre><code class="language-rust">
use std::sync::{Mutex, Condvar, Arc};
use std::thread;
fn main(){
    let pair = Arc::new((Mutex::new(false), Condvar::new()));
    let (lock, cvar) = &*pair;

    // Несколько потоков ждут
    for i in 0..3 {
        let pair = Arc::clone(&pair);
        thread::spawn(move || {
            let (lock, cvar) = &*pair;
            let mut started = lock.lock().unwrap();
            while !*started {
                started = cvar.wait(started).unwrap();
            }
            println!("Поток {} проснулся!", i);
        });
    }

    // Главный поток будит всех
    thread::sleep(std::time::Duration::from_secs(1));
    {
        let mut started = lock.lock().unwrap();
        *started = true;
        cvar.notify_all(); // Будим ВСЕ ожидающие потоки
    }}
</code></pre>
