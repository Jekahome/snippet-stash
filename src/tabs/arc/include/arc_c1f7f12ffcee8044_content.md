

Создает новый слабый указатель Weak на это значение
<pre><code class="language-rust">
use std::sync::Arc;
fn main(){
    let five = Arc::new(5);
    let weak_five = Arc::downgrade(&five);
}
</code></pre>

---
Не клонирует в отличии от **make_mut**.
Возвращает измененную ссылку на внутреннее значение, если нет других указателей Arc или Weak для одного и того же значения. 
Возвращает None в противном случае, потому что нецелесообразно изменять общее значение. 
<pre><code class="language-rust">
use std::sync::Arc;
fn main(){
    let mut x = Arc::new(3);
    *Arc::get_mut(&mut x).unwrap() = 4;
    assert_eq!(*x, 4);

    let _y = Arc::clone(&x);
    assert!(Arc::get_mut(&mut x).is_none());
}
</code></pre>

---

<pre><code class="language-rust">
use std::any::Any;
use std::sync::Arc;
fn print_if_string(value: Arc<dyn Any + Send + Sync>) {
    if let Ok(string) = value.downcast::<String>() {
        println!("String ({}): {}", string.len(), string);
    }
}
fn main(){
    let my_string = "Hello World".to_string();
    print_if_string(Arc::new(my_string));
    print_if_string(Arc::new(0i8));
}
</code></pre>

