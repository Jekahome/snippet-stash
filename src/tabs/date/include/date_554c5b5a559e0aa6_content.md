

**Из std в chrono**
<pre><code class="language-rust">
use std::time::Duration as StdDuration;
use chrono::{Duration as ChronoDuration, TimeDelta};
fn main(){
    let std_duration = StdDuration::from_secs(3600);
    let chrono_duration = ChronoDuration::from_std(std_duration).unwrap();

    println!("1 час в chrono: {:?}", chrono_duration);
}
</code></pre>

**Из chrono в std**
<pre><code class="language-rust">
use chrono::{Duration as ChronoDuration, TimeDelta};
use std::time::Duration as StdDuration;
fn main(){
    let chrono_duration = ChronoDuration::hours(1);
    let std_duration = chrono_duration.to_std().unwrap();

    println!("1 час в std: {:?}", std_duration);
}
</code></pre>

**Обработка ошибок преобразования**
<pre><code class="language-rust">
use chrono::{Duration as ChronoDuration, TimeDelta};
fn main(){
    // Отрицательные длительности нельзя преобразовать в std
    let negative_chrono = ChronoDuration::seconds(-5);

    match negative_chrono.to_std() {
        Ok(std_dur) => println!("Успех: {:?}", std_dur),
        Err(e) => println!("Ошибка: {}", e), // Будет ошибка!
    }
}
</code></pre>
