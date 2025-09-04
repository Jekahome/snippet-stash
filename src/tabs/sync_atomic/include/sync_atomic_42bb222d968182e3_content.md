

Атомные типы являются строительными блоками незакрепленных структур данных и других параллельных типов. При доступе к / модификации атомного типа следует указывать порядок памяти, представляющий силу барьера памяти. Rust обеспечивает 5 примитивов упорядочения памяти: Relaxed (самый слабый), Acquire (для чтения aka load), Release (для записи aka магазинов), AcqRel (эквивалент «Приобретать для загрузки и выпуска для хранения»; полезно, когда оба участвуют в одной операции, такой как compare-and-swap) и SeqCst (самый сильный). 
<pre><code class="language-rust">
use std::cell::UnsafeCell;
use std::sync::atomic::{AtomicUsize, Ordering};
use std::sync::{Arc, Barrier};
use std::thread;

struct UsizePair {
    atom: AtomicUsize,
    norm: UnsafeCell<usize>,
}

// UnsafeCell не является потокобезопасным. Поэтому вручную пометьте наш UsizePair как Sync. 
// (Фактически сообщая компилятору: «Я сам об этом позабочусь!»)
unsafe impl Sync for UsizePair {}

static NTHREADS: usize = 8;
static NITERS: usize = 1000000;

fn main() {
    let upair = Arc::new(UsizePair::new(0));

// Barrier — это структура синхронизации, похожая на счетчик (не путать
// с барьером памяти). Он блокируется при вызове 'wait' до тех пор, пока не будет получено фиксированное число
// вызовов 'wait' из различных потоков (например, ожидание, пока все
// игроки доберутся до стартовой линии, прежде чем выстрелить из стартового пистолета).
    let barrier = Arc::new(Barrier::new(NTHREADS + 1));

    let mut children = vec![];

    for _ in 0..NTHREADS {
        let upair = upair.clone();
        let barrier = barrier.clone();
        children.push(thread::spawn(move || {
            barrier.wait();

            let mut v = 0;
            while v < NITERS - 1 {
                // Прочитайте оба члена `atom` и `norm` и проверьте, содержит ли `atom` 
                // более новое значение, чем `norm`. См. описание реализации `UsizePair` для подробностей.
                let (atom, norm) = upair.get();
                if atom > norm {
                    // Если в `get` и `set` используется порядок `Acquire`-`Release`, 
                   // то этот оператор никогда не будет выполнен.
                    println!("Reordered! {} > {}", atom, norm);
                }
                v = atom;
            }
        }));
    }

    barrier.wait();

    for v in 1..NITERS {
        // Обновите оба члена `atom` и `norm`, указав значение `v`. См. описание реализации.  
        upair.set(v);
    }

    for child in children {
        let _ = child.join();
    }
}

impl UsizePair {
    pub fn new(v: usize) -> UsizePair {
        UsizePair {
            atom: AtomicUsize::new(v),
            norm: UnsafeCell::new(v),
        }
    }

    pub fn get(&self) -> (usize, usize) {
        let atom = self.atom.load(Ordering::Relaxed); //Ordering::Acquire

        // Если указанная выше операция загрузки выполняется с упорядочением `Acquire`, 
        // то все записи перед соответствующим хранилищем `Release` 
        // гарантированно будут видны ниже.

        let norm = unsafe { *self.norm.get() };
        (atom, norm)
    }

    pub fn set(&self, v: usize) {
        unsafe { *self.norm.get() = v };

// Если приведенная ниже операция хранения выполняется с упорядочением 'Release',
// то запись в 'norm' выше гарантированно будет видна всем
// потокам, которые 'загружают 'atom' с порядком 'Acquire' и видят то же
// значение, которое было сохранено ниже'. Тем не менее, никаких гарантий не предоставляется, так как
// когда другие читатели станут свидетелями приведенного ниже сохранения, и, следовательно
// вышеупомянутая запись. С другой стороны, также нет никакой гарантии, что
// эти два значения будут синхронизированы для читателей. Даже если другой поток
// увидит то же значение, которое было сохранено ниже, он может на самом деле увидеть значение
// 'позже' в 'норме' по сравнению с тем, что было написано выше. То есть, там
// нет ограничений на видимость будущего.

        self.atom.store(v, Ordering::Relaxed); //Ordering::Release
    }
}
</code></pre>
Примечание. Архитектуры x86 имеют сильную модель памяти. Эта статья объясняет это подробно. Также взгляните на страницу Википедии для сравнения архитектур.

