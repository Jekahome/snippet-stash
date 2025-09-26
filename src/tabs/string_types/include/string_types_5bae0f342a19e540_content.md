


<pre><code class="language-rust">
fn main(){
// Получить &mut str:
 let mut buf:String = String::from("hello");
 let s:&mut str = buf.get_mut(0..).unwrap();
 let s:&mut str = buf.as_mut();
 let s:&mut str = buf.borrow_mut();
}
</code></pre>

---
 
<pre><code class="language-rust">
fn main(){
   // Можно уменьшить размер среза, но не увеличить:
   let mut rust:&str = "hello";
   rust = rust.trim_matches('o');
   rust = rust.strip_prefix("h").unwrap();
   assert_eq!("ell",rust);

   // Для изменения содержимого строки, можно хранить ее в виде среза 
   // Без увеличения размера и соблюдения длины символа, так как кириллица занимает 2 байта в отличии от 1 байта латиницы
   let bytes:&mut [u8] = &mut [104, 101, 108, 108, 111]; // hello
   bytes[2]=b'h';
   bytes[3]=104u8;
   assert_eq!("hehho",std::str::from_utf8(&bytes).unwrap());
   let mut rust = std::str::from_utf8(&bytes).unwrap(); 
   rust = rust.trim_matches('o');
   rust = rust.strip_prefix("h").unwrap();
   assert_eq!("ehh",rust); 

    // Заменим два символа латиницы `ll` на один кириллицы `М`:
    let bytes:&mut [u8] = &mut [104, 101, 108, 108, 111]; // hello
    bytes[2]=208u8;
    bytes[3]=156u8;
    assert_eq!("heМo",std::str::from_utf8(&bytes).unwrap());
    let mut rust = std::str::from_utf8(&bytes).unwrap(); 
    rust = rust.trim_matches('o');
    rust = rust.strip_prefix("h").unwrap();
    assert_eq!("eМ",rust); 

}
</code></pre>
