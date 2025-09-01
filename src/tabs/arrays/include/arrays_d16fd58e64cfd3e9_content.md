


<pre><code class="language-rust">
fn main(){
    let v = [10, 40, 30];
    assert_eq!(Some(&40), v.get(1));
    assert_eq!(Some(&[10, 40][..]), v.get(0..2));
    assert_eq!(None, v.get(3));
    assert_eq!(None, v.get(0..4));
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let x = &mut [0, 55, 2];
    if let Some(elem) = x.get_mut(55) {
        *elem = 42;
    }
    assert_eq!(x, &[0, 42, 2])
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let x = &[1, 2, 4];
    unsafe {
        assert_eq!(x.get_unchecked(1), &2);
    }
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let x = &mut [1, 2, 4];
    unsafe {
        let elem = x.get_unchecked_mut(1);
        *elem = 13;
    }
    assert_eq!(x, &[1, 13, 4]);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let x = &mut [0, 1, 2];
    if let Some(first) = x.first_mut() {
        *first = 5;
    }
    assert_eq!(x, &[5, 1, 2]);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let x = &mut [0, 1, 2];
    if let Some(last) = x.last_mut() {
        *last = 10;
    }
    assert_eq!(x, &[0, 1, 10]);
}
</code></pre>

