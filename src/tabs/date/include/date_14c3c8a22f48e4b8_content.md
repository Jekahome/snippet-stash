

**Сравнение двух моментов времени**


<pre><code class="language-rust">
use std::time::{SystemTime, Duration};
fn main(){
    let time1 = SystemTime::now();
    std::thread::sleep(Duration::from_secs(1));
    let time2 = SystemTime::now();

    match time1.cmp(&time2) {
        std::cmp::Ordering::Less => println!("time1 раньше time2"),
        std::cmp::Ordering::Equal => println!("Времена равны"),
        std::cmp::Ordering::Greater => println!("time1 позже time2"),
    }
}
</code></pre>

**Разница между временами**
<pre><code class="language-rust">
use std::time::{SystemTime, Duration};
fn main(){
    let earlier = SystemTime::now();
    std::thread::sleep(Duration::from_secs(3));
    let later = SystemTime::now();

    match later.duration_since(earlier) {
        Ok(diff) => println!("Разница: {:?}", diff),
        Err(e) => println!("Ошибка: {:?}", e), // Если earlier > later
    }
}
</code></pre>
