


<pre><code class="language-rust">
fn main(){
// cmp - сравнение
    use std::cmp::Ordering::*;
    let x = vec![1, 2, 3];
    assert_eq!(x.par_iter().cmp(&vec![1, 3, 0]), Less);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
// partial_cmp
    use std::cmp::Ordering::*;
    use std::f64::NAN;
    let x = vec![1.0, 2.0, 3.0];
    assert_eq!(x.par_iter().partial_cmp(&vec![1.0, 3.0, 0.0]), Some(Less));
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
// enumerate - Устанавливает индекс вместе с каждым элементом.
    let chars = vec!['a', 'b', 'c'];
    let result: Vec<_> = chars
        .into_par_iter()
        .enumerate()
        .collect();
    assert_eq!(result, [(0, 'a'), (1, 'b'), (2, 'c')]);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
// skip - Создает итератор, который пропускает первые nэлементы.
    let result: Vec<_> = (0..100)
        .into_par_iter()
        .skip(95)
        .collect();
    assert_eq!(result, [95, 96, 97, 98, 99]);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
// take - Создает итератор, который дает первые nэлементы.
    let result: Vec<_> = (0..100)
        .into_par_iter()
        .take(5)
        .collect();
    assert_eq!(result, [0, 1, 2, 3, 4]);
}
</code></pre>
