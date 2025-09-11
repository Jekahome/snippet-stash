

Паники, если начальная точка больше конечной точки или конечная точка больше длины вектора
<pre><code class="language-rust">
fn main(){
     let mut v = vec![1, 2, 3];
     let u: Vec<_> = v.drain(1..).collect();
     assert_eq!(v, &[1]);
     assert_eq!(u, &[2, 3]);

     v.drain(..);
     assert_eq!(v, &[]);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut vec = vec![1, 2, 2, 3, 2];
    vec.sort();
    vec.dedup();
    assert_eq!(vec, [1, 2, 3, 2]);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut vec = vec![10, 20, 21, 30, 20];
    // vec.dedup_by_key(|i| *i / 10);//10, 20, 30, 20
    vec.dedup_by_key(|i| true);// 10
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut vec = vec!["foo", "bar", "Bar", "baz", "bar"];
    vec.dedup_by(|a, b| a.eq_ignore_ascii_case(b));
    assert_eq!(vec, ["foo", "bar", "baz", "bar"]);

    let mut s: Vec<char> = Vec::from_iter("aaa    bbb   ccc".chars());
    s.dedup_by(|a, b| a.is_whitespace() && b.is_whitespace());
    let result: String = String::from_iter(s);
    println!("{result}",);
}
</code></pre>
