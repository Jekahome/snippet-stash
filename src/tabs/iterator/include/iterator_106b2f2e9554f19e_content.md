

**collect** - Создайте новую коллекцию, содержащую весь элемент, созданный этим параллельным итератором.
Вы можете предпочесть использовать collect_into_vec(), который более эффективно распределяется с точным знанием того, сколько элементов содержит итератор, и даже позволяет повторно использовать хранилище существующего вектора, а не выделять свежий вектор.
<pre><code class="language-rust">
fn main(){
    let sync_vec: Vec<_> = (0..100).into_iter().collect();
    let async_vec: Vec<_> = (0..100).into_par_iter().collect();
    assert_eq!(sync_vec, async_vec);

    let mut vec: Vec<_> = vec![];
    (0..100).into_par_iter().collect_into_vec(&mut vec);
}
</code></pre>


Распаковывает элементы параллельного итератора в пару произвольных ParallelExtend контейнеров.
Вы можете предпочесть использовать **unzip_into_vecs()**, который более эффективно распределяется с точным знанием того, сколько элементов содержит итератор, и даже позволяет повторно использовать резервные хранилища существующих векторов, а не выделять свежие векторы.
<pre><code class="language-rust">
fn main(){
    let a = [(0, 1), (1, 2), (2, 3), (3, 4)];
    let (left, right): (Vec<_>, Vec<_>) = a.par_iter().cloned().unzip();
    assert_eq!(left, [0, 1, 2, 3]);
    assert_eq!(right, [1, 2, 3, 4]);

    let mut left = vec![0;4];
    let mut right = vec![0;4];
    a.par_iter().cloned().unzip_into_vecs(&mut left, &mut right);
    assert_eq!(left, [0, 1, 2, 3]);
    assert_eq!(right, [1, 2, 3, 4]);
}
</code></pre>
