


<pre><code class="language-rust">
fn main(){
    let a = String::from("foo");
    a.len()

    let s = String::from("hello");
    assert_eq!(5, s.len() * std::mem::size_of::<u8>()); //  размер типа в байтах

// Метод .len() типа String или &str возвращает длину строки, измеряемую в байтах, а не в символах:
    assert_eq!("ಠ_ಠ".len(), 7);
    assert_eq!("ಠ_ಠ".chars().count(), 3);
}
</code></pre>

---

т.е. хоть char имеет 4 байта, но строка оптимизирует хранение символов и удаляет пустые байты
<pre><code class="language-rust">
fn main() {
    println!("Size of a char: {}", std::mem::size_of::<char>()); // 4 байта
    println!("Size of a: {}", "a".len()); // 1 байта
    println!("Size of ß: {}", "ß".len()); // 2 байта
    println!("Size of 国: {}", "国".len()); // 3 байта или print!("{}",std::mem::size_of_val("国"));
    println!("Size of 𓅱: {}", "𓅱".len()); // 4 байта
}
</code></pre>
