


<pre><code class="language-rust">
// Пример из библиотеки Rumpsteak
use rumpsteak::{Session, send, receive};

#[session]
fn session_example() -> send!(String, receive!(i32)) {
    send!("Hello").and_then(|_| receive!(i32))
}
fn main() {
    let result = session_example(); // строгая типизация сессии
    // обрабатываем результат
}
</code></pre>
