

**Форматирование дат**
<pre><code class="language-rust">
use chrono::{Local, Datelike, Timelike};
fn main(){
    let now = Local::now();

    // Стандартное форматирование
    println!("RFC2822: {}", now.to_rfc2822());
    println!("RFC3339: {}", now.to_rfc3339());
    println!("ISO8601: {}", now.to_rfc3339());

    // Кастомное форматирование
    println!("Custom: {}", now.format("%Y-%m-%d %H:%M:%S"));
    println!("Russian: {}", now.format("%d.%m.%Y %H:%M"));

    // Доступ к компонентам
    println!("Год: {}, Месяц: {}, День: {}", 
        now.year(), now.month(), now.day());
    println!("Час: {}, Минута: {}, Секунда: {}",
        now.hour(), now.minute(), now.second());
}
</code></pre>

**Парсинг из строк**
<pre><code class="language-rust">
use chrono::{DateTime, Local, NaiveDate};
fn main(){
    // Парсинг RFC3339
    let rfc_str = "2024-01-15T14:30:00+03:00";
    let dt: DateTime<FixedOffset> = DateTime::parse_from_rfc3339(rfc_str).unwrap();
    println!("Parsed: {}", dt);

    // Парсинг кастомных форматов
    let custom_str = "15.01.2024 14:30";
    let naive_dt = NaiveDateTime::parse_from_str(custom_str, "%d.%m.%Y %H:%M").unwrap();
    println!("Parsed naive: {}", naive_dt);

    // Парсинг даты
    let date_str = "2024-01-15";
    let date = NaiveDate::parse_from_str(date_str, "%Y-%m-%d").unwrap();
    println!("Parsed date: {}", date);
}
</code></pre>
