

<pre><code class="language-rust">
use std::cell::UnsafeCell;
use std::marker::Sync;
 
pub struct OnceCell<T> {
    // Invariant: written to at most once.
    inner: UnsafeCell<Option<T>>,
}
impl<T> OnceCell<T> {
    pub fn new() -> OnceCell<T> {
     OnceCell { inner: UnsafeCell::new(None) }
    }
    pub fn get(&self) -> Option<&T> {
     unsafe { &*self.inner.get() }.as_ref()
    }
    pub fn set(&self, value: T) -> Result<(), T> {
        let slot = unsafe { &mut *self.inner.get() };
        if slot.is_some() { return Err(value); }
        *slot = Some(value);
        Ok(())
    }
}

// Заведём функцию, удобную в контексте ленивости:
impl<T> OnceCell<T> {
    pub fn get_or_init(&self, f: impl FnOnce() -> T) -> &T {
/*
     // ошибка UB неопределенное поведение если вызывать код в замыкании
    let slot = unsafe { &mut *self.inner.get() };
    match slot {
        None => {
            // smell: вызов callback в unsafe
            *slot = Some(f());
             slot.as_ref().unwrap()
        }
        Some(value) => value,
    }
*/
        // преаращаем UB в ошибку компиляции или Panic
        self.get().unwrap_or_else(|| {
            let inserted = self.set(f());
            assert!(inserted.is_ok(), "reentrancy");
            self.get().unwrap()
        })
    }
}
fn main() {
   // Вызовем рекурсивно для проверки корректности
    let cell: OnceCell<Box<i32>> = OnceCell::new();
    let mut r1: Option<&i32> = None;
    let r2: &i32 = cell.get_or_init(|| {
        r1 = Some(&*cell.get_or_init(|| Box::new(1)));
        Box::new(2)
    });
    let r1: &i32 = r1.unwrap();
    println!("{} {}", r1, r2);
}
</code></pre>
