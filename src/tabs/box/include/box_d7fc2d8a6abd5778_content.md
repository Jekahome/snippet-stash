

Самореферентная структура — это структура, которая содержит ссылку на данные внутри самой себя. То есть у неё есть поле, которое указывает на другое её поле.
<pre><code class="language-rust">
struct SelfRef<'a> {
    text: String,
    slice: Option<&'a str>, // ссылка на text внутри этой же структуры
}

impl<'_> SelfRef<'_> {
    fn new(text: String) -> Self {
        SelfRef { text, slice: None }
    }

    fn init(&mut self) {
        let slice = &self.text[..];
        self.slice = Some(slice); // ❌ ошибка!
// Потому что, чтобы сохранить ссылку на self.text, структура должна жить дольше самой ссылки. Но они живут одинаково, и borrow checker не может гарантировать безопасность.
    }
}

</code></pre>

**Как решают проблему?**
* 1. Не использовать ссылки, а хранить индексы
* 2. Использовать Pin + unsafe
* 3. Использование умных указателей Arc или Rc

**1. Не использовать ссылки, а хранить индексы**:
<pre><code class="language-rust">
struct SafeRef {
    text: String,
    slice_range: Option<(usize, usize)>,
}

impl SafeRef {
    fn init(&mut self) {
        self.slice_range = Some((0, 5));
    }

    fn get_slice(&self) -> &str {
        let (start, end) = self.slice_range.unwrap();
        &self.text[start..end]
    }
}
</code></pre>

---

**2. Использовать Pin + unsafe**

Самореферентные типы возможны через Pin, но это продвинутый путь:

Pin гарантирует, что объект не будет перемещён в памяти после инициализации.

Тогда ссылка внутри остаётся валидной.
<pre><code class="language-rust">
use std::pin::Pin;
use std::marker::PhantomPinned;

struct SelfRef {
    data: String,
    reference: *const String,
    _pin: PhantomPinned,
}

impl SelfRef {
    fn new(text: &str) -> Pin<Box<Self>> {
        let mut this = Box::pin(Self {
            data: text.to_string(),
            reference: std::ptr::null(),
            _pin: PhantomPinned,
        });
        
        unsafe {
            let mut_ref = Pin::as_mut(&mut this);
            Pin::get_unchecked_mut(mut_ref).reference = &this.data;
        }
        
        this
    }
}
</code></pre>

---

Использование crate **ouroboros**. Специализированный крейт для самореферентных структур:
<pre><code class="language-rust">
use ouroboros::self_referencing;

#[self_referencing]
struct MyStruct {
    text: String,
    #[borrows(text)]
    slice: &'this str,
}

fn main() {
    let my = MyStruct::new("Hello World".to_string(), |text| &text[..5]);
    println!("{}", my.borrow_slice()); // Hello
}
</code></pre>

---

**3. Использование умных указателей Arc или Rc**
 
<pre><code class="language-rust">
use std::rc::Rc;

struct SharedData {
    data: Rc<String>,
    reference: Rc<String>, // та же самая ссылка
}

impl SharedData {
    fn new(text: &str) -> Self {
        let data = Rc::new(text.to_string());
        Self {
            reference: Rc::clone(&data),
            data,
        }
    }
}
</code></pre>




