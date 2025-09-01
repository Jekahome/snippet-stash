


<pre><code class="language-rust">
fn main(){
    let s = "ПРИВЕТ";
    println!("{}",s.to_lowercase());// привет
    let s = "привет";
    println!("{}",s.to_uppercase());// ПРИВЕТ
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut s = String::from("Grüße, Jürgen ❤");
    s.make_ascii_uppercase();
    assert_eq!("GRüßE, JüRGEN ❤", s);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let s = "Grüße, Jürgen ❤"; 
    assert_eq!("grüße, jürgen ❤", s.to_ascii_lowercase());
    assert_eq!("GRüßE, JüRGEN ❤", s.to_ascii_uppercase());
}
</code></pre>
