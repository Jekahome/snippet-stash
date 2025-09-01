


<pre><code class="language-rust">
fn main(){
    let v = [10, 40, 30];
    assert!(v.contains(&30));
    assert!(!v.contains(&50));
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let v = [10, 40, 30];
    assert!(v.starts_with(&[10]));
    assert!(v.starts_with(&[10, 40]));
    assert!(!v.starts_with(&[50]));
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let  s = String::from("Привет");
    unsafe{
        let bytes =  s.as_bytes();
        assert!(!bytes.is_ascii());  
    }
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut bytes = *b"Hello";
    assert!(bytes.eq_ignore_ascii_case(&[72, 101, 108, 108, 111]));
}
</code></pre>
