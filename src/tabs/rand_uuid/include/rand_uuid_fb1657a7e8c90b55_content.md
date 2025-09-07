

Генерация случайной строки
<pre><code class="language-rust">
use rand::{thread_rng, Rng};
use rand::distributions::Alphanumeric;

fn main() {
    let random_string: String = thread_rng()
        .sample_iter(&Alphanumeric) // Итератор случайных символов
        .take(10) // Длина строки
        .map(char::from)
        .collect();

    println!("Random string: {}", random_string);
}
</code></pre>
