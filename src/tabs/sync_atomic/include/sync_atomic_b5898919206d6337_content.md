

Следующий пример Мары для упорядочивания Release/Acquire — это очень элементарная блокировка, которая использует AtomicBool для защиты доступа к a String. 

Вот слегка измененная версия этого примера:
Две критические линии:
1. `if LOCKED.compare_exchange(false, true, Acquire, Relaxed).is_ok() {`
2. `LOCKED.store(false, Release);`

Первая строка атомарно считывается LOCKED с использованием Acquire порядка, и если значение равно false, она устанавливает значение с true использованием Relaxed порядка.
Вторая строка LOCKED возвращает нас к false использованию Release. Как мы уже видели, Release означает, что все записи, которые произошли с этим моментом или до него, будут видны после Acquire этой же переменной.
Объединение этих двух строк гарантирует, что unsafe запись в DATA и Release запись в READY будут завершены до того, как другой поток заметит LOCKED использование false порядка Acquire.
<pre><code class="language-rust">
use std::sync::atomic::Ordering::{Acquire, Relaxed, Release};
use std::sync::atomic::AtomicBool;

static mut DATA: String = String::new();
static LOCKED: AtomicBool = AtomicBool::new(false);

fn f() {
    if LOCKED.compare_exchange(false, true, Acquire, Relaxed).is_ok() {
        // Safety: We hold the exclusive lock, so nothing else is accessing DATA.
        unsafe { DATA.push('!') };
        LOCKED.store(false, Release);
    }
}

fn main() {
    std::thread::scope(|s| {
        for _ in 0..100 {
            s.spawn(f);
        }
    });
    println!("{}", unsafe { &DATA });
}
</code></pre>
