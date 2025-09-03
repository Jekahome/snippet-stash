

<pre><code class="language-rust">
fn main(){
    let c = std::cell::RefCell::new(5);
    let old_value = c.replace(6);//Заменяет завернутое значение новым, возвращая старое // std::mem::replace
    let six = c.into_inner();//разименовывание RefCell, возвращая завернутое значение

    println!("{} {}",six, old_value);//6 5
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let cell = RefCell::new(5);
    let old_value = cell.replace_with(|&mut old| old + 1);
    assert_eq!(old_value, 5);
    assert_eq!(cell, RefCell::new(6));
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    use std::cell::RefCell;
    let c = RefCell::new(5);
    let d = RefCell::new(6);
    c.swap(&d);
    assert_eq!(c, RefCell::new(6));
    assert_eq!(d, RefCell::new(5));
}
</code></pre>
