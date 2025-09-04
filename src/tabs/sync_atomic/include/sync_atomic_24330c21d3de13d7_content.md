

<pre><code class="language-rust">
use std::sync::atomic::{AtomicBool, Ordering};
fn main(){
    let cancel_flag = Arc::new(AtomicBool::new(false));
    let worker_cancel_flag = cancel_flag.clone();
}
</code></pre>
 
Ниже приведен код рабочего потока:
<pre><code class="language-rust">
fn main(){
    let worker_handle = spawn(move || {
        for pixel in animation.pixels_mut() {
             render(pixel); // трассировка лучей – занимает несколько микросекунд
             if worker_cancel_flag.load(Ordering::SeqCst) {
                  return None;
             }
        }
        Some(animation)
   });
}
</code></pre>


Если в главном потоке мы решим прервать рабочий поток, то сохраним значение true в AtomicBool, а затем дождемся завершения потока:
```
// Прервать рендеринг.
cancel_flag.store(true, Ordering::SeqCst);
// Отбросить результат, который, скорее всего, равен `None`.
worker_handle.join().unwrap();
```

Конечно, задачу можно решить и по-другому. Тип AtomicBool можно было бы заменить мьютексом Mutex`<bool>` или каналом. 
Основное отличие состоит в том, что у атомарных типов накладные расходы минимальны. Атомарные операции никогда не приводят к системному вызову. 
Загрузка и сохранение значений часто компилируются в одну машинную команду.

