

OnceLock: Предоставляет удобный способ для хранения значения, инициализированного только один раз, и позволяет безопасно получать это значение в многопоточной среде.
<pre><code class="language-rust">
use std::sync::OnceLock;
static X: OnceLock<AtomicU64> = OnceLock::new();

fn get_x() -> u64 {
    // Инициализация переменной X
    X.get_or_init(|| AtomicU64::new(calculate_x()));

    // Доступ к переменной X
    X.get().unwrap().load(Ordering::Relaxed)
}

fn calculate_x() -> u64 {
    // Пример дорогостоящих вычислений
    42
}
</code></pre>
