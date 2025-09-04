

**Правильное использование:**
- до создания потоков
- инициализация перед многопоточным использованием
- локальное использование/тестирование без многопоточности

**Неправильное использование:**
- попытка использовать get_mut() с Arc
- после передачи в поток

---

✅ **Правильное использование - до создания потоков**
<pre><code class="language-rust">
use std::sync::Mutex;

fn main() {
    // Создаем мьютекс в основном потоке
    let mut mutex = Mutex::new(vec![1, 2, 3]);
    
    // get_mut() безопасен - нет других ссылок на Mutex
    let data = mutex.get_mut().unwrap();
    data.push(4);
    data.push(5);
    
    println!("До создания потоков: {:?}", data); // [1, 2, 3, 4, 5]
    
    // Теперь можно передавать в потоки
    let shared_mutex = std::sync::Arc::new(mutex);
    // Дальше работаем через lock()
}
</code></pre>

✅ **Инициализация перед многопоточным использованием**
<pre><code class="language-rust">
use std::sync::{Mutex, Arc};

fn initialize_config() -> Arc<Mutex<Config>> {
    let mut mutex = Mutex::new(Config::default());
    
    // Безопасная инициализация без блокировок
    let config = mutex.get_mut().unwrap();
    config.timeout = 30;
    config.retries = 3;
    config.load_credentials();
    
    Arc::new(mutex) // Теперь передаем в потоки
}

struct Config {
    timeout: u32,
    retries: u32,
    // другие поля...
}

impl Default for Config {
    fn default() -> Self {
        Self { timeout: 0, retries: 0 }
    }
}
</code></pre>

---

❌ **Попытка использовать get_mut() с Arc**
<pre><code class="language-rust">
use std::sync::{Mutex, Arc};
fn main(){
    let shared_mutex = Arc::new(Mutex::new(42));

    // ОШИБКА! get_mut() требует эксклюзивного доступа
    // let data = shared_mutex.get_mut().unwrap(); // Не скомпилируется

    // Правильно - через lock()
    let data = shared_mutex.lock().unwrap();
}
</code></pre>

❌ **После передачи в поток**
<pre><code class="language-rust">
use std::sync::{Mutex, Arc};
use std::thread;
fn main(){
    let mutex = Arc::new(Mutex::new(0));

    let thread_mutex = Arc::clone(&mutex);
    thread::spawn(move || {
        let _lock = thread_mutex.lock().unwrap();
    });

    // ОШИБКА! Мьютекс уже разделяется между потоками
    // let data = mutex.get_mut(); // Не скомпилируется
}
</code></pre>
