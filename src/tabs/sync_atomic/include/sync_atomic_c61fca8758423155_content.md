

Давайте рассмотрим пример Мар, где используется метод AtomicBoolto для оповещения о готовности некоторых данных:
Основной поток ожидает DATA готовности и спит в течение 100 миллисекунд между каждой проверкой.

Важно то, что строка READY.store(true, Release); гарантирует, что все записи, которые произошли с этим моментом или до него, будут видны после Acquire на этой же переменной . Обратите внимание, как DATA написано до момента Release, и это только с использованием Relaxed порядка.

Когда основной поток наконец замечает, READY.load(Acquire) что true, мы выходим из while цикла и наконец считываем значение. Даже если DATA.load(Relaxed) использует Relaxed, он гарантированно увидит значение. Запись произошла до Release момента на READY переменной, и это load происходит после соответствующего Acquire на READY.
<pre><code class="language-rust">
use std::sync::atomic::{AtomicBool, AtomicU64};
use std::sync::atomic::Ordering::{Acquire, Relaxed, Release};

static DATA: AtomicU64 = AtomicU64::new(0);
static READY: AtomicBool = AtomicBool::new(false);

fn main() {
    std::thread::spawn(|| {
        DATA.store(123, Relaxed);
        READY.store(true, Release); // Everything from before this store ..
    });
    while !READY.load(Acquire) { // .. is visible after this loads `true`.
        std::thread::sleep(std::time::Duration::from_millis(100));
        println!("waiting...");
    }
    println!("{}", DATA.load(Relaxed));
}
</code></pre>
