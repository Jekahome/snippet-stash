

<pre><code class="language-rust">
fn main(){
    use std::cell::OnceCell;
    let cell = OnceCell::new();
    assert!(cell.get().is_none());// данных нет

    assert_eq!(cell.set(90), Ok(()));
    assert!(cell.get().is_some());// данных есть
    assert_eq!(cell.set(44), Err(44));// больше установить данные нельзя
    assert_eq!(cell.get().unwrap(),&90); 
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let cell = OnceCell::new();
    let value = cell.get_or_init(|| 92);
    assert_eq!(value, &92);
    let value = cell.get_or_init(|| unreachable!());
    assert_eq!(value, &92);  
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    // Установил -> сбросил -> установил -> сбросил ...
    let mut cell = OnceCell::new();
    cell.set("hello".to_string()).unwrap();
    assert!(cell.get().is_some());  
    assert_eq!(cell.take(), Some("hello".to_string()));
    assert_eq!(cell.get(), None);  
    cell.set("hello".to_string()).unwrap();
    assert!(cell.get().is_some());  
    assert_eq!(cell.take(), Some("hello".to_string())); 
}
</code></pre>
