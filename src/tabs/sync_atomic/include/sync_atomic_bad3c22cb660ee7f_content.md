

**Спин-блокировка** — это механизм синхронизации, который позволяет потокам ожидать освобождения ресурса, активно "крутясь" (то есть, постоянно проверяя состояние ресурса), вместо того чтобы переходить в спящий режим. Это полезно, когда время ожидания ресурса предполагается коротким, поскольку спин-блокировки могут быть более эффективными, чем более сложные механизмы, такие как мьютексы.

**Преимущества**: Спин-блокировка может быть более эффективной, чем использование мьютексов или других сложных механизмов синхронизации, если время ожидания невелико. Это связано с тем, что потоки не переходят в спящий режим, а продолжают активно проверять состояние ресурса.

**Недостатки**: Спин-блокировки могут быть неэффективными, если время ожидания ресурса значительно, поскольку активное ожидание потребляет процессорное время, которое могло бы быть использовано для выполнения другой работы. Это также может привести к увеличению энергопотребления и снижению общей производительности.
<pre><code class="language-rust">
use std::ops::{Deref, DerefMut};
use std::cell::UnsafeCell;
use std::sync::atomic::AtomicBool;
use std::sync::atomic::Ordering::{Acquire, Release};

pub struct SpinLock<T> {
    locked: AtomicBool,
    value: UnsafeCell<T>,
}

unsafe impl<T> Sync for SpinLock<T> where T: Send {}

pub struct Guard<'a, T> {
    lock: &'a SpinLock<T>,
}

unsafe impl<T> Sync for Guard<'_, T> where T: Sync {}

impl<T> SpinLock<T> {
    pub const fn new(value: T) -> Self {
        Self {
            locked: AtomicBool::new(false),
            value: UnsafeCell::new(value),
        }
    }
    pub fn lock(&self) -> Guard<T> {
        while self.locked.swap(true, Acquire) {
            std::hint::spin_loop();
        }
        Guard { lock: self }
    }
}
impl<T> Deref for Guard<'_, T> {
    type Target = T;
    fn deref(&self) -> &T {
        // Safety: The very existence of this Guard
        // guarantees we've exclusively locked the lock.
        unsafe { &*self.lock.value.get() }
    }
}
impl<T> DerefMut for Guard<'_, T> {
    fn deref_mut(&mut self) -> &mut T {
        // Safety: The very existence of this Guard
        // guarantees we've exclusively locked the lock.
        unsafe { &mut *self.lock.value.get() }
    }
}
impl<T> Drop for Guard<'_, T> {
    fn drop(&mut self) {
        self.lock.locked.store(false, Release);
    }
}
fn main() {
    use std::thread;
    let x = SpinLock::new(Vec::new());
    thread::scope(|s| {
        s.spawn(|| x.lock().push(1));
        s.spawn(|| {
            let mut g = x.lock();
            g.push(2);
            g.push(2);
        });
    });
    let g = x.lock();
    assert!(g.as_slice() == [1, 2, 2] || g.as_slice() == [2, 2, 1]);
}
</code></pre>
