

**Измерение времени с учетом реального времени**
<pre><code class="language-rust">
fn track_operation_time() {
    let start = SystemTime::now();
    
    // Выполняем операцию
    std::thread::sleep(Duration::from_secs(2));
    
    match start.elapsed() {
        Ok(elapsed) => {
            println!("Операция заняла: {:?}", elapsed);
            println!("Началась в: {:?}", start);
            println!("Закончилась в: {:?}", SystemTime::now());
        }
        Err(e) => println!("Ошибка измерения: {:?}", e),
    }
}
</code></pre>

**Проверка возраста файла**
<pre><code class="language-rust">
use std::fs;
use std::time::{SystemTime, Duration};

fn is_file_old(path: &str, max_age: Duration) -> bool {
    if let Ok(metadata) = fs::metadata(path) {
        if let Ok(modified) = metadata.modified() {
            if let Ok(age) = SystemTime::now().duration_since(modified) {
                return age > max_age;
            }
        }
    }
    false
}
fn main(){
    // Проверяем, старше ли файл 1 часа
    if is_file_old("data.txt", Duration::from_secs(3600)) {
        println!("Файл устарел");
    }
}
</code></pre>

**Кеширование с временем жизни**
<pre><code class="language-rust">
use std::collections::HashMap;

struct Cache<T> {
    data: HashMap<String, (T, SystemTime)>,
    ttl: Duration,
}
impl<T> Cache<T> {
    fn new(ttl: Duration) -> Self {
        Self {
            data: HashMap::new(),
            ttl,
        }
    }
    fn insert(&mut self, key: String, value: T) {
        self.data.insert(key, (value, SystemTime::now()));
    }
    fn get(&mut self, key: &str) -> Option<&T> {
        if let Some((value, timestamp)) = self.data.get(key) {
            if let Ok(age) = SystemTime::now().duration_since(*timestamp) {
                if age <= self.ttl {
                    return Some(value);
                } else {
                    self.data.remove(key); // Удаляем просроченное
                }
            }
        }
        None
    }
}
</code></pre>

**Синхронизация времени между системами**
<pre><code class="language-rust">
fn check_time_sync(server_time: u64) -> Result<(), String> {
    let local_time = SystemTime::now()
        .duration_since(SystemTime::UNIX_EPOCH)
        .unwrap()
        .as_secs();
    
    let diff = (local_time as i64 - server_time as i64).abs();
    
    if diff > 60 {
        Err(format!("Расхождение времени: {} секунд", diff))
    } else {
        Ok(())
    }
}
</code></pre>

**Логирование с временными метками**
<pre><code class="language-rust">
fn log_with_timestamp(message: &str) {
    let timestamp = SystemTime::now()
        .duration_since(SystemTime::UNIX_EPOCH)
        .unwrap()
        .as_secs();
    
    println!("[{}] {}", timestamp, message);
}
</code></pre>
