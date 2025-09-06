

**Измерение времени выполнения**
<pre><code class="language-rust">
use std::time::{Duration, Instant};

fn expensive_operation() {
    // Имитация тяжелой операции
    std::thread::sleep(Duration::from_millis(100));
}

fn main() {
    let start = Instant::now();
    expensive_operation();
    let duration = start.elapsed();
    
    println!("Операция заняла: {:?}", duration);
    println!("В миллисекундах: {} ms", duration.as_millis());
}
</code></pre>

**Таймауты и задержки**
<pre><code class="language-rust">
use std::thread;
use std::time::Duration;
fn main(){
    // Задержка выполнения
    println!("Начало");
    thread::sleep(Duration::from_secs(2));
    println!("Прошло 2 секунды");

    // Таймаут для операций
    let result = some_operation.timeout(Duration::from_secs(5));
}
</code></pre>

**Работа с системным временем**
<pre><code class="language-rust">
use std::time::{Duration, SystemTime};
fn main(){
    let now = SystemTime::now();
    let future = now + Duration::from_secs(3600); // Через час

    match future.duration_since(SystemTime::UNIX_EPOCH) {
        Ok(duration) => println!("UNIX timestamp: {}", duration.as_secs()),
        Err(e) => println!("Ошибка: {:?}", e),
    }
}
</code></pre>

**Агрегация времени**
<pre><code class="language-rust">
fn calculate_total_time(operations: Vec<Duration>) -> Duration {
    operations.iter().sum()
}
fn main(){
    let times = vec![
        Duration::from_secs(10),
        Duration::from_millis(500),
        Duration::from_secs(30),
    ];
    let total = calculate_total_time(times);
    println!("Общее время: {:?}", total); // 40.5 секунд
}
</code></pre>
