

**Богатый набор типов данных**
<pre><code class="language-rust">
use chrono::{DateTime, Local, Utc, FixedOffset};
use chrono::naive::{NaiveDate, NaiveTime, NaiveDateTime};
use chrono::format::{ParseResult, Parsed};
fn main(){
    // Различные представления времени
    let local: DateTime<Local> = Local::now();
    let utc: DateTime<Utc> = Utc::now();
    let with_offset: DateTime<FixedOffset> = FixedOffset::east_opt(3600).unwrap().from_utc_datetime(&utc.naive_utc());
// NaiveDateTime быстрее чем DateTime<Utc>
}
</code></pre>

**Используйте правильные типы:**
* `chrono::naive::{NaiveDate, NaiveTime, NaiveDateTime}` - когда временная зона не важна
* `chrono::DateTime<chrono::Utc>` - для хранения времени в UTC
* `chrono::DateTime<chrono::Local>` - для отображения пользователю


**Наивные даты и время (без временных зон)**
<pre><code class="language-rust">
use chrono::naive::{NaiveDate, NaiveTime, NaiveDateTime};
fn main(){
    // Только дата
    let date = NaiveDate::from_ymd_opt(2024, 1, 15).unwrap();
    println!("Дата: {}", date);

    // Только время
    let time = NaiveTime::from_hms_opt(14, 30, 0).unwrap();
    println!("Время: {}", time);

    // Дата и время вместе
    let datetime = NaiveDateTime::new(date, time);
    println!("Дата и время: {}", datetime);
}
</code></pre>

**Работа с временными зонами**
<pre><code class="language-rust">
use chrono::{Utc, Local, FixedOffset, TimeZone};
fn main(){
    // UTC время
    let utc_now = Utc::now();
    println!("UTC: {}", utc_now);

    // Локальное время системы
    let local_now = Local::now();
    println!("Локальное: {}", local_now);

    // Конкретная временная зона (UTC+3)
    let moscow_offset = FixedOffset::east_opt(3 * 3600).unwrap();
    let moscow_time = moscow_offset.from_utc_datetime(&utc_now.naive_utc());
    println!("Москва: {}", moscow_time);

    // Преобразование между зонами
    let local_in_utc = local_now.with_timezone(&Utc);
    println!("Локальное в UTC: {}", local_in_utc);
}
</code></pre>
