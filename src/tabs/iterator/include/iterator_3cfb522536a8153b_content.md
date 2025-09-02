

<pre><code class="language-rust">
fn main(){
// chain - Принимает два итератора и создает новый итератор для обоих.
    let a = [0, 1, 2];
    let b = [9, 8, 7];
    let par_iter = a.par_iter().chain(b.par_iter());
    let chained: Vec<_> = par_iter.cloned().collect();
    assert_eq!(&chained[..], &[0, 1, 2, 9, 8, 7]);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
// find_any Ищет какой-то элемент в параллельном итераторе, который соответствует данному предикату и возвращает его.
//  find_last find_first
    let a = [1, 2, 3, 3];
    assert_eq!(a.par_iter().find_any(|&&x| x == 3), Some(&3));
    assert_eq!(a.par_iter().find_any(|&&x| x == 100), None);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
// any()->bool Ищет какой-то элемент в параллельном итераторе, который соответствует заданному предикату, и если так возвращает true.
    let a = [0, 12, 3, 4, 0, 23, 0];
    let is_valid = a.par_iter().any(|&x| x > 10 && x < 20 );
    assert!(is_valid);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
// all->bool  Проверяет, что каждый элемент в параллельном итераторе соответствует заданному предикату, и если это так возвращает true
    let a = [0, 12, 3, 4, 0, 23, 0];
    let is_valid = a.par_iter().all(|&x| x > 10);
    assert!(!is_valid);
}
</code></pre>

