

Гарантирует полный последовательный порядок для всех операций. Это означает, что все потоки видят операции в том же порядке, в каком они были выполнены. Это самый строгий порядок памяти.
Применяется, когда требуется гарантировать, что все операции в программе видны в том же порядке, независимо от того, какие потоки их выполняли.

Пример: Сложные синхронизационные примеры, где необходима полная последовательность операций.
<pre><code class="language-rust">
use std::sync::atomic::Ordering::SeqCst;
static A: AtomicBool = AtomicBool::new(false);
static B: AtomicBool = AtomicBool::new(false);
static mut S: String = String::new();
fn main() {
    let a = thread::spawn(|| {
        A.store(true, SeqCst);
        if !B.load(SeqCst) {
            unsafe { S.push('!') };
        }
    });
    let b = thread::spawn(|| {
        B.store(true, SeqCst);
        if !A.load(SeqCst) {
            unsafe { S.push('!') };
        }
    });
    a.join().unwrap();
    b.join().unwrap();
}
</code></pre>
