

std::sync::Once используется для выполнения какой-либо операции только один раз в течение жизни программы. 
Это особенно полезно для инициализации ресурсов, таких как глобальные или статические переменные.
<pre><code class="language-rust">
use std::sync::{Once, ONCE_INIT};
use std::sync::atomic::{AtomicU64, Ordering};

static INIT: Once = Once::new();
static mut X: Option<AtomicU64> = None;

fn get_x() -> u64 {
    // Инициализация переменной X
    INIT.call_once(|| {
        unsafe {
            X = Some(AtomicU64::new(calculate_x()));
        }
    });

    // Доступ к переменной X
    unsafe {
        X.as_ref().unwrap().load(Ordering::Relaxed)
    }
}

fn calculate_x() -> u64 {
    // Пример дорогостоящих вычислений
    42
}
</code></pre>
