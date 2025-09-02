


<pre><code class="language-rust">
fn main(){
// partition - Разделяет элементы параллельного итератора на пару произвольных  ParallelExtend контейнеров.
// Элементы, для которых predicate возвращает true, входят в первый контейнер, а остальные идут во второй.
    let (left, right): (Vec<_>, Vec<_>) = (0..8).into_par_iter().partition(|x| x % 2 == 0);
    assert_eq!(left, [0, 2, 4, 6]);
    assert_eq!(right, [1, 3, 5, 7]);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
  // partition_map - Разделяет и сопоставляет элементы параллельного итератора в пару произвольных ParallelExtend контейнеров.
    // Either::Left предметы входят в первый контейнер, а Either::Rightпредметы переходят во второй.
    use rayon::iter::Either;
    let (left, right): (Vec<_>, Vec<_>) = (0..8).into_par_iter()
        .partition_map(|x| {
            if x % 2 == 0 {
                Either::Left(x * 4)
            } else {
                Either::Right(x * 3)
            }
        });
    assert_eq!(left, [0, 8, 16, 24]);
    assert_eq!(right, [3, 9, 15, 21]);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
// intersperse -  Перемещает клоны элемента между элементами этого итератора.
    let x = vec![1, 2, 3, 4];
    let r: Vec<_> = x.into_par_iter().intersperse(-100).collect();
    assert_eq!(r, vec![1, -100, 2, -100, 3, -100, 4]);
}
</code></pre>
