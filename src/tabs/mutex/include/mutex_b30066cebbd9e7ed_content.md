

Что делает:

```rust
// Ждет пока:
// 1. Получит уведомление ИЛИ истечет таймаут
// 2. И условие предиката вернет true
// 3. Возвращает результат: (MutexGuard, bool) - где bool = таймаут ли?
```

**Примеры использования:**

**1. Ожидание данных с таймаутом**
<pre><code class="language-rust">
use std::sync::{Mutex, Condvar};
use std::time::Duration;
fn main(){
    let pair = (Mutex::new(false), Condvar::new());
    let (lock, cvar) = &pair;

    // Поток-ожидатель
    let (guard, timeout) = cvar.wait_timeout_while(
        lock.lock().unwrap(),
        Duration::from_secs(5), // 5 секунд таймаут
        |&mut data_ready| !data_ready // Ждем пока data_ready != true
    ).unwrap();

    if timeout.timed_out() {
        println!("Таймаут! Данные не получены за 5 секунд");
    } else {
        println!("Данные получены!");
    }
}
</code></pre>


**2. Ожидание очереди с условием**
<pre><code class="language-rust">
struct TaskQueue {
    tasks: Mutex<Vec<Task>>,
    cvar: Condvar,
}

impl TaskQueue {
    fn pop_with_timeout(&self, timeout: Duration) -> Option<Task> {
        let (mut guard, result) = self.cvar.wait_timeout_while(
            self.tasks.lock().unwrap(),
            timeout,
            |tasks| tasks.is_empty() // Ждем пока очередь НЕ пуста
        ).unwrap();

        if result.timed_out() {
            None // Таймаут - задач нет
        } else {
            guard.pop() // Берем задачу
        }
    }
}
</code></pre>


**3. Ожидание конкретного состояния**
<pre><code class="language-rust">
struct Processor {
    status: Mutex<Status>,
    cvar: Condvar,
}

#[derive(PartialEq)]
enum Status {
    Idle,
    Processing,
    Complete,
}

impl Processor {
    fn wait_for_completion(&self, timeout: Duration) -> bool {
        let (guard, result) = self.cvar.wait_timeout_while(
            self.status.lock().unwrap(),
            timeout,
            |status| *status != Status::Complete // Ждем завершения
        ).unwrap();

        !result.timed_out() // true если завершился, false если таймаут
    }
}
</code></pre>


**4. Реализация connection pool с таймаутом**
<pre><code class="language-rust">
struct ConnectionPool {
    connections: Mutex<Vec<Connection>>,
    cvar: Condvar,
}

impl ConnectionPool {
    fn get_connection(&self, timeout: Duration) -> Option<Connection> {
        let (mut guard, result) = self.cvar.wait_timeout_while(
            self.connections.lock().unwrap(),
            timeout,
            |conns| conns.is_empty() // Ждем пока есть свободные соединения
        ).unwrap();

        if result.timed_out() {
            None // Нет свободных соединений
        } else {
            guard.pop() // Берем соединение
        }
    }
}
</code></pre>


**5. Ожидание с прогрессом**
<pre><code class="language-rust">
struct Downloader {
    progress: Mutex<f64>,
    cvar: Condvar,
}

impl Downloader {
    fn wait_for_progress(&self, target: f64, timeout: Duration) -> bool {
        let (guard, result) = self.cvar.wait_timeout_while(
            self.progress.lock().unwrap(),
            timeout,
            |progress| *progress < target // Ждем пока прогресс >= target
        ).unwrap();

        if result.timed_out() {
            println!("Таймаут! Прогресс: {}", *guard);
            false
        } else {
            println!("Достигнут прогресс: {}", *guard);
            true
        }
    }
}
</code></pre>
