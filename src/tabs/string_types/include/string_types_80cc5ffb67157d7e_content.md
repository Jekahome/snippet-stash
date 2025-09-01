


<pre><code class="language-rust">
fn main(){
// Возвращает None, если эта строка пуста.
    let mut s = String::from("fo");
    assert_eq!(s.pop(), Some('o'));
    assert_eq!(s.pop(), Some('f'));
    assert_eq!(s.pop(), None);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut s = String::from("α is alpha, β is beta");
    let beta_offset = s.find('β').unwrap_or(s.len());

// Удалите диапазон до тех пор, пока β из строки
    let t: String = s.drain(0..beta_offset).collect();
    assert_eq!(t, "α is alpha, ");
    assert_eq!(s, "β is beta");

// Полный диапазон очистки строки
    s.drain(..);
    assert_eq!(s, "");
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut s = String::from("нет");
    assert_eq!(s.remove(0), 'н');
    println!("{} capacity={}",s,s.capacity());// ет capacity=6
    assert_eq!(s.remove(0), 'е');
    println!("{} capacity={}",s,s.capacity());// т capacity=6
    assert_eq!(s.remove(0), 'т');

    let mut s = String::from("fox");
    assert_eq!(s.remove(2), 'x');
    assert_eq!(s.remove(1), 'o');
    assert_eq!(s.remove(0), 'f');
    println!("{} capacity={}",s,s.capacity());
}
</code></pre>

---
 
<pre><code class="language-rust">
fn main(){
    #![feature(string_remove_matches)]
    let mut s = String::from("Trees are not green, the sky is not blue.");
    s.remove_matches("not ");
    assert_eq!("Trees are green, the sky is blue.", s);
}
</code></pre>

---
 
<pre><code class="language-rust">
fn main(){
    let mut s = String::from("α is alpha, β is beta");
    let beta_offset = s.find('β').unwrap_or(s.len());

    // Замените диапазон до β  
    s.replace_range(..beta_offset, "Α is capital alpha; ");
    assert_eq!(s, "Α is capital alpha; β is beta");
}
</code></pre>
