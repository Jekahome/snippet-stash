

**Привязан к реальному времени**
<pre><code class="language-rust">
use std::time::SystemTime;
fn main(){
    let now = SystemTime::now();
    println!("Текущее системное время: {:?}", now);
}
</code></pre>

**Можно преобразовать в UNIX timestamp**
<pre><code class="language-rust">
fn main(){
    let now = SystemTime::now();
    match now.duration_since(SystemTime::UNIX_EPOCH) {
        Ok(duration) => println!("UNIX timestamp: {} секунд", duration.as_secs()),
        Err(e) => println!("Ошибка: {:?}", e),
    }
}
</code></pre>

**Поддерживает операции с датами**
<pre><code class="language-rust">
use std::time::{SystemTime, Duration};
fn main(){
    let now = SystemTime::now();
    let one_hour_later = now + Duration::from_secs(3600);
    let one_day_ago = now - Duration::from_secs(86400);
}
</code></pre>

**Обработка ошибок** SystemTime может работать с датами до UNIX EPOCH (1 января 1970):
<pre><code class="language-rust">
fn handle_pre_epoch_time() {
    let pre_epoch = SystemTime::UNIX_EPOCH - Duration::from_secs(3600);
    
    match pre_epoch.duration_since(SystemTime::UNIX_EPOCH) {
        Ok(_) => unreachable!(), // Не должно случиться
        Err(e) => {
            println!("Время до EPOCH: {:?}", e);
            println!("На {:?} до EPOCH", e.duration());
        }
    }
}
fn main(){
    handle_pre_epoch_time();
}
</code></pre>
