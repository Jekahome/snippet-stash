

<pre><code class="language-rust">
fn main(){
// position_any - Ищет какой-то элемент в параллельном итераторе, который соответствует данному предикату, и возвращает его индекс.
    let a = [1, 2, 3, 3];
    let i = a.par_iter().position_any(|&x| x == 3).expect("found");
    assert!(i == 2 || i == 3);
    assert_eq!(a.par_iter().position_any(|&x| x == 100), None);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
// rev - Производит новый итератор с элементами этого итератора в обратном порядке.
    let result: Vec<_> = (0..5)
        .into_par_iter()
        .rev()
        .collect();

    assert_eq!(result, [4, 3, 2, 1, 0]);
}
</code></pre>
