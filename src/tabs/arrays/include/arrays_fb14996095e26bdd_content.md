


<pre><code class="language-rust">
fn main(){
    let mut v = [-5i32, 4, 1, -3, 2];

    // Find the median
    v.select_nth_unstable(2);

    // Мы гарантируем, что срез будет одним из следующих, в зависимости от того, как мы сортируем
    // по указанному индексу.
    assert!(v == [-3, -5, 1, 2, 4] ||
                v == [-5, -3, 1, 2, 4] ||
                v == [-3, -5, 1, 4, 2] ||
                v == [-5, -3, 1, 4, 2]);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut v = [-5i32, 4, 1, -3, 2];
    // Найдите медиану, как если бы срез был отсортирован в порядке убывания.
    v.select_nth_unstable_by(2, |a, b| b.cmp(a));
    assert!(v == [2, 4, 1, -5, -3] ||
                v == [2, 4, 1, -3, -5] ||
                v == [4, 2, 1, -5, -3] ||
                v == [4, 2, 1, -3, -5]);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut a = ['a', 'b', 'c', 'd', 'e', 'f'];
    a.rotate_left(2);
    assert_eq!(a, ['c', 'd', 'e', 'f', 'a', 'b']);
    Rotating a subslice:

    let mut a = ['a', 'b', 'c', 'd', 'e', 'f'];
    a[1..5].rotate_left(1);
    assert_eq!(a, ['a', 'c', 'd', 'e', 'b', 'f']);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut a = ['a', 'b', 'c', 'd', 'e', 'f'];
    a.rotate_right(2);
    assert_eq!(a, ['e', 'f', 'a', 'b', 'c', 'd']);
}
</code></pre>
