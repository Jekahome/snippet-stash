

Важно понимать, что в Rust два вида закрепления (pinning): structural pinning и proprietary pinning.

**Structural pinning**: Подразумевает, что сам объект и все его поля не могут быть перемещены после того, как объект был закреплен. Это достигается тем, что структура не реализует трейт Unpin, и, соответственно, гарантирует, что все её поля также не реализуют Unpin.

**Proprietary pinning**: Используется для более гибкого управления, когда только некоторые части объекта не могут быть перемещены, а другие могут. Обычно достигается через использование безопасных абстракций и методов.

**Когда использовать Structural Pinning**

Structural pinning следует использовать, когда:

**1. Ссылка на внутренние поля**: Когда структура хранит ссылки на свои собственные поля, перемещение всей структуры нарушит эти ссылки. В этом случае необходимо гарантировать, что вся структура остается на месте после закрепления.

**2. Асинхронные операции**: Когда структура используется в асинхронных задачах и её перемещение может привести к небезопасным ситуациям. Например, futures, которые хранят ссылки на свои внутренние данные.

**3. Низкоуровневое программирование**: В некоторых системных программах, например, при работе с аппаратными ресурсами или взаимодействии с C-кодом, требуется гарантировать, что определенные данные остаются на одном месте в памяти.

<pre><code class="language-rust">
use std::pin::Pin;
use std::marker::PhantomPinned;
use std::ptr::NonNull;

struct MyStruct {
    value: i32,
    self_ref: Option<NonNull<MyStruct>>,
    _marker: PhantomPinned,
}

impl MyStruct {
    fn new(value: i32) -> Pin<Box<MyStruct>> {
        let mut boxed = Box::pin(MyStruct {
            value,
            self_ref: None,
            _marker: PhantomPinned,
        });
        let self_ref = NonNull::from(&*boxed);
        // Safety: this is safe because the boxed value will never move.
        unsafe {
            let mut_ref = Pin::as_mut(&mut boxed);
            Pin::get_unchecked_mut(mut_ref).self_ref = Some(self_ref);
        }
        boxed
    }

    fn get_self_ref(&self) -> &MyStruct {
        unsafe { self.self_ref.unwrap().as_ref() }
    }
}

fn main() {
    let pinned = MyStruct::new(10);
    println!("Value: {}", pinned.as_ref().get_ref().value);
    println!("Self-ref Value: {}", pinned.as_ref().get_ref().get_self_ref().value);
}
</code></pre>
