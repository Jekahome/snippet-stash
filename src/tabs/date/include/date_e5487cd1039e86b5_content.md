

<pre><code class="language-rust">
use std::time::Duration;
fn main(){
    // Создание из различных единиц времени
    let sec = Duration::from_secs(5);        // 5 секунд
    let millis = Duration::from_millis(500); // 500 миллисекунд
    let micros = Duration::from_micros(1000);// 1000 микросекунд
    let nanos = Duration::from_nanos(1_000_000); // 1 миллисекунда

    // Использование констант
    let zero = Duration::ZERO;      // Нулевая длительность
    let max = Duration::MAX;        // Максимально возможная длительность

    // Извлечение компонентов
    let duration = Duration::from_millis(1234567);

    println!("Секунды: {}", duration.as_secs());        // 1234
    println!("Миллисекунды: {}", duration.as_millis()); // 1234567
    println!("Микросекунды: {}", duration.as_micros()); // 1234567000
    println!("Наносекунды: {}", duration.as_nanos());   // 1234567000000

    // Дробная часть секунд
    println!("Дробные секунды: {:?}", duration.subsec_nanos()); // 567000000
}
</code></pre>


Полезные методы:
<pre><code class="language-rust">
fn main(){
    let mut duration = Duration::from_secs(10);

    // Проверка на нулевую длительность
    println!("Is zero: {}", duration.is_zero()); // false

    // Получение минимального/максимального значения
    println!("Min: {:?}", duration.min(Duration::from_secs(5))); // 5 сек
    println!("Max: {:?}", duration.max(Duration::from_secs(5))); // 10 сек

    // Saturating операции (без паники при переполнении)
    let saturated = duration.saturating_add(Duration::MAX);
    println!("Saturated add: {:?}", saturated);
}
</code></pre>

Арифметические операции:
<pre><code class="language-rust">
fn main(){
    let d1 = Duration::from_secs(10);
    let d2 = Duration::from_secs(5);

    // Сложение
    let sum = d1 + d2; // 15 секунд

    // Вычитание
    let diff = d1 - d2; // 5 секунд

    // Умножение на скаляр
    let doubled = d1 * 2; // 20 секунд

    // Деление на скаляр
    let half = d1 / 2; // 5 секунд

    // Сравнение Duration
    let short = Duration::from_secs(1);
    let long = Duration::from_secs(10);

    println!("short < long: {}", short < long);   // true
    println!("short == long: {}", short == long); // false
    println!("short > long: {}", short > long);   // false
}
</code></pre>




