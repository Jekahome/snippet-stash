

**Отрицательные значения**
<pre><code class="language-rust">
use chrono::{Duration, TimeDelta};
fn main(){
    // chrono поддерживает отрицательные длительности
    let negative_duration = Duration::seconds(-5);
    let past_date = some_date + negative_duration; // Перемещение в прошлое
}
</code></pre>

**Богатый API для извлечения компонентов**
<pre><code class="language-rust">
use chrono::{Duration, TimeDelta};
fn main(){
    let duration = Duration::hours(25) + Duration::minutes(30);

    println!("Полное время: {}", duration);
    println!("Часы: {}", duration.num_hours());        // 25
    println!("Минуты: {}", duration.num_minutes());    // 1530
    println!("Секунды: {}", duration.num_seconds());   // 91800

}
</code></pre>
