

**wait_timeout_while** - это самый продвинутый и безопасный метод ожидания в Rust, который сочетает все необходимые механизмы для надежной синхронизации!

**Чем лучше обычного wait:**

| Метод | Преимущества |
|-------|-------------|
| `wait_timeout_while` | + Таймаут + Предикат + Защита от ложных пробуждений |
| `wait` | Может ждать вечно |
| `wait_timeout` | Только таймаут, без предиката |
| `wait_while` | Только предикат, без таймаута |

**Идеальные use cases:**

1. **Очереди с таймаутом** — ждать задачу не больше X времени
2. **Resource pooling** — ждать свободный ресурс с таймаутом  
3. **Graceful shutdown** — ждать завершения с максимальным временем
4. **Progress waiting** — ждать определенного прогресса с таймаутом
5. **Coordination** — синхронизация потоков с ограничением по времени

---

**Важные нюансы:**

**Ложные пробуждения (spurious wakeups)**
<pre><code class="language-rust">
// Предикат защищает от ложных пробуждений
cvar.wait_timeout_while(
    guard,
    timeout,
    |data| data.is_empty() // Перепроверяем условие при пробуждении
)
</code></pre>

**Обработка результата**
<pre><code class="language-rust">
fn main(){
    let (guard, wait_result) = cvar.wait_timeout_while(guard, timeout, predicate).unwrap();

    if wait_result.timed_out() {
        // Таймаут - условие не выполнено
    } else {
        // Условие выполнено (получено notify или предикат изменился)
    }
}
</code></pre>
 
**Возвращаемое значение**
<pre><code class="language-rust">
fn main(){
// Возвращает кортеж:
// - Guard: возобновленная блокировка мьютекса
// - WaitTimeoutResult: информация о таймауте

    let (mut guard, result) = cvar.wait_timeout_while(guard, timeout, |x| x < 10);

// Можно использовать guard дальше
    *guard += 1;

    if result.timed_out() {
        println!("Не дождались за {} мс", timeout.as_millis());
    }
}
</code></pre>

