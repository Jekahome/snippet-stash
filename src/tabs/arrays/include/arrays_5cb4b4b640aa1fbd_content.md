


<pre><code class="language-rust">
fn main(){
    let mut bytes = *b"hello";
    bytes.make_ascii_uppercase();
    if let Ok(result)=std::str::from_utf8(&bytes){
        assert_eq!(result,"HELLO");
    }
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut bytes = *b"HELLO";
    bytes.make_ascii_lowercase();
    if let Ok(result)=std::str::from_utf8(&bytes){
        assert_eq!(result,"hello");
    }
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut bytes = *b"HELLO";
    let to_lower:Vec<u8> = bytes.to_ascii_lowercase();
    if let Ok(result)=std::str::from_utf8(&to_lower){
        assert_eq!(result,"hello");
    }
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut bytes = *b"hello";
    let to_upper:Vec<u8> = bytes.to_ascii_uppercase();
    if let Ok(result)=std::str::from_utf8(&to_upper){
        assert_eq!(result,"HELLO");
    }
}
</code></pre>
