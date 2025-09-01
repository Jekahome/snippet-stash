

Если lifetime входа нет, то lifetime выхода должен быть ограничен lifetim'om входа.
<pre><code class="language-rust">
fn main(){ 
  let r = get_str();
  println!(""{}"",r);
}
fn get_str<'a>() -> &'a str{
     "hello"
}

// Или вернуть 'static
fn foo()->&'static str{"hello"}
</code></pre>

---

Это работает потому что мы возвращаем ссылку из области времени жизни main `fn first_word<'a>(s: &'a str) -> &'a str `
<pre><code class="language-rust">
fn first_word(s: &str) -> &str {
    let bytes = s.as_bytes();

    for (i, &item) in bytes.iter().enumerate() {
        if item == b' ' {
            return &s[0..i];
        }
    }
    &s[..]
}
fn main() {
    let sentence = String::from("Hello World");
    let res:&str = first_word(&sentence);
    println!("{}",res);
}
</code></pre>
