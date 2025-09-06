

**Создание из UNIX timestamp**
<pre><code class="language-rust">
use std::time::{SystemTime, Duration};
fn main(){
    // Из секунд
    let from_seconds = SystemTime::UNIX_EPOCH + Duration::from_secs(1640995200); // 1 Jan 2022

    // Из миллисекунд
    let from_millis = SystemTime::UNIX_EPOCH + Duration::from_millis(1640995200000);
}
</code></pre>

**Преобразование в разные форматы**
<pre><code class="language-rust">
use std::time::{SystemTime, Duration};
fn format_system_time(time: SystemTime) -> String {
    match time.duration_since(SystemTime::UNIX_EPOCH) {
        Ok(duration) => {
            let seconds = duration.as_secs();
            let minutes = seconds / 60;
            let hours = minutes / 60;
            let days = hours / 24;
            
            format!("{} дней, {} часов, {} минут", days, hours % 24, minutes % 60)
        }
        Err(_) => "Время до UNIX EPOCH".to_string(),
    }
}
fn main(){
    let from_seconds = SystemTime::UNIX_EPOCH + Duration::from_secs(1640995200); // 1 Jan 2022
    println!("{}",format_system_time(from_seconds));
}
</code></pre>
