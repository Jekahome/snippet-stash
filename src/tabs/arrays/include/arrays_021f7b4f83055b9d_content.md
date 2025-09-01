


<pre><code class="language-rust">
fn main(){
    let mut buf = vec![0; 10];
    buf.fill(1); // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    assert_eq!(buf, vec![1; 10]);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut buf = vec![1; 10];
    buf.fill_with(Default::default); // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    assert_eq!(buf, vec![0; 10]);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let arr = [1, 2, 3];
    let v:Vec<i32> = arr.repeat(2);
    assert_eq!(v, vec![1, 2, 3, 1, 2, 3]);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let arr:[i32;3] = [1, 2, 3];
    let v:Vec<i32> = (&arr).to_vec();
    let v:Vec<i32> = arr.to_vec();
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    assert_eq!(["hello", "world"].concat(), "helloworld");
    assert_eq!([[1, 2], [3, 4]].concat(), [1, 2, 3, 4]);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    assert_eq!(["hello", "world"].join(" "), "hello world");
    assert_eq!([[1, 2], [3, 4]].join(&0), [1, 2, 0, 3, 4]);
    assert_eq!([[1, 2], [3, 4]].join(&[0, 0][..]), [1, 2, 0, 0, 3, 4]);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let src = [1, 2, 3, 4];
    let mut dst = [0, 0];
    dst.clone_from_slice(&src[2..]);

    assert_eq!(src, [1, 2, 3, 4]);
    assert_eq!(dst, [3, 4]);
     
    let raw: &[u8] ;   
    let mut array = [0u8; 8];
    array.clone_from_slice(raw);
    u64::from_be_bytes(array)
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut bytes = *b"Hello, World!";
    bytes.copy_within(0..5, 7);
    assert_eq!(&bytes, b"Hello, Hello!");
}
</code></pre>


