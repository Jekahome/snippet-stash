

**Операции с датами**
<pre><code class="language-rust">
use chrono::{Local, Duration, Months, TimeDelta};
fn main(){
    let now = Local::now();

    // Добавление Duration
    let tomorrow = now + Duration::days(1);
    let next_hour = now + Duration::hours(1);

    // Добавление месяцев (с учетом разной длины месяцев)
    let next_month = now + Months::new(1);
    let three_months_later = now + Months::new(3);

    // Вычитание
    let yesterday = now - Duration::days(1);
    let last_month = now - Months::new(1);

    // Разница между датами
    let diff = tomorrow - now;
    println!("До завтра: {:?}", diff);
}
</code></pre>

**Сравнение дат**
<pre><code class="language-rust">
use chrono::Local;
fn main(){
    let now = Local::now();
    let future = now + Duration::days(1);

    println!("now < future: {}", now < future);
    println!("now == future: {}", now == future);
    println!("now > future: {}", now > future);

    // Проверка на равенство с допуском
    let almost_now = now + Duration::milliseconds(500);
    let is_almost_equal = (now - almost_now).num_seconds().abs() < 1;
    println!("Почти одинаково: {}", is_almost_equal);
}
</code></pre>
