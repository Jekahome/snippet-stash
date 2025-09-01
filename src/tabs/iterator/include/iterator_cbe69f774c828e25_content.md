

<pre><code class="language-rust">
fn main(){
    let a = [1, 2, 3];
    assert!(a.iter().all(|&x| x > 0));
    assert!(!a.iter().all(|&x| x > 2));
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let a = [1, 2, 3];
    assert!(a.iter().any(|&x| x > 0));
    assert!(!a.iter().any(|&x| x > 5));
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    #![feature(is_sorted)]
    assert!([1, 2, 2, 9].iter().is_sorted());
    assert!([1, 2, 2, 9].iter().is_sorted_by(|a, b| a.partial_cmp(b)));
    assert!(["c", "bb", "aaa"].iter().is_sorted_by_key(|s| s.len()));
}
</code></pre>
