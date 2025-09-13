

**Работа с датами и календарем**
<pre><code class="language-rust">
use chrono::{Duration, Local, TimeDelta};
fn main(){
    let now = Local::now();
    println!("Сейчас: {}", now);

    // Календарные операции
    let tomorrow = now + Duration::days(1);
    let next_week = now + Duration::weeks(1);
    let next_month = now + Duration::days(30);

    println!("Завтра: {}", tomorrow);
    println!("Через неделю: {}", next_week);
}
</code></pre>

**Разница между датами с учетом календаря**
<pre><code class="language-rust">
use chrono::{Duration, NaiveDate, TimeDelta};
fn main(){
    let start = NaiveDate::from_ymd_opt(2024, 1, 1).unwrap();
    let end = NaiveDate::from_ymd_opt(2024, 2, 1).unwrap();

    let difference: Duration = end - start;
    println!("Разница между датами: {} дней", difference.num_days());
}
</code></pre>

**Сложные временные интервалы**
<pre><code class="language-rust">
use chrono::{Duration, TimeDelta};
fn main(){
    // Создание сложных интервалов
    let complex_duration = Duration::days(5) + 
                          Duration::hours(12) + 
                          Duration::minutes(30) +
                          Duration::seconds(45);

    println!("Сложный интервал: {}", complex_duration);
}
</code></pre>

**Обработка временных зон**
<pre><code class="language-rust">
use chrono::{Duration, Utc, FixedOffset, TimeDelta};
fn main(){
    let utc_time = Utc::now();
    let moscow_offset = FixedOffset::east_opt(3 * 3600).unwrap();
    let moscow_time = utc_time.with_timezone(&moscow_offset);

    // Добавление времени с учетом смещения
    let later_in_moscow = moscow_time + Duration::hours(2);
}
</code></pre>

**Парсинг и форматирование длительностей**
```
use chrono::{Duration, TimeDelta};

// Из строки в Duration (примерный парсинг)
fn parse_duration(s: &str) -> Option<Duration> {
    let parts: Vec<&str> = s.split_whitespace().collect();
    if parts.len() != 2 {
        return None;
    }
    
    let value: i64 = parts[0].parse().ok()?;
    match parts[1] {
        "days" => Some(Duration::days(value)),
        "hours" => Some(Duration::hours(value)),
        "minutes" => Some(Duration::minutes(value)),
        "seconds" => Some(Duration::seconds(value)),
        _ => None,
    }
}

if let Some(duration) = parse_duration("2 days") {
    println!("Parsed duration: {:?}", duration);
}
```
