

**Send + Sync (можно передавать между потоками и совместный доступ)**

- **Примитивы**: `i8`, `i16`, `i32`, `i64`, `i128`, `isize`
- **Примитивы**: `u8`, `u16`, `u32`, `u64`, `u128`, `usize`
- **Примитивы**: `f32`, `f64`, `bool`, `char`
- **Умные указатели**: `Box<T>` (если T: Send + Sync)
- **Атомарные типы**: `AtomicBool`, `AtomicI8`, ..., `AtomicUsize`
- **Синхронизация**: `Mutex<T>`, `RwLock<T>`, `Arc<T>` (если T: Send + Sync)
- **Каналы**: `Sender<T>`, `Receiver<T>` (если T: Send)
- `String`, `Vec<T>` (если T: Send + Sync)
- `Option<T>`, `Result<T, E>` (если T,E: Send + Sync)

**!Send (нельзя передавать между потоками)**

- **Ссылки**: `Rc<T>` - подсчет ссылок не атомарный
- **Ссылки**: `&'static mut T` - исключительная мутабельная ссылка
- **Селлы**: `Cell<T>` (если T: !Copy)
- **Ссылки на локальные данные**: `&'a T` где `'a` не `'static`
- `*mut T`, `*const T` (сырые указатели)
- `MutexGuard<'a, T>` - привязан к конкретному Mutex в потоке
- `dyn Trait` (если Trait: !Send)

**!Sync (нельзя передавать между потоками)**

- **Клетки**: `Cell<T>`, `RefCell<T>` - внутренняя мутабельность без синхронизации
- **Ссылки**: `Rc<T>` - не атомарный подсчет ссылок
- `*mut T`, `*const T` (сырые указатели)
- `UnsafeCell<T>` - основа внутренней мутабельности
- `dyn Trait` (если Trait: !Sync)

**!Send + !Sync (полностью не thread-safe)**

- **Ссылки с подсчетом**: `Rc<T>` - основной пример!
- **Клетки**: `Cell<T>`, `RefCell<T>` (если T: !Send)
- `*mut T`, `*const T` (сырые указатели)
- `UnsafeCell<T>` (если T: !Send)
- `dyn Trait` (если Trait: !Send + !Sync)


<pre><code class="language-rust">
use std::rc::Rc;
use std::cell::Cell;
use std::sync::Arc;
use std::sync::Mutex;
fn main(){
    // Send + Sync
    let atomic = Arc::new(5);
    let mutex = Mutex::new(42);

    // !Send
    let rc = Rc::new(5);
    let cell = Cell::new(42);

    // !Sync  
    let cell = Cell::new(42);
    let ref_cell = std::cell::RefCell::new(42);

    // !Send + !Sync
    let rc_cell = Rc::new(Cell::new(42));
}
</code></pre>
