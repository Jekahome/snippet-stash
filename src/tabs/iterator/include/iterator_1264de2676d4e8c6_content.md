


<pre><code class="language-rust">
fn main(){
//len - Производит точное подсчет количества элементов, которые этот итератор будет производить, не допуская паники
    let par_iter = (0..100).into_par_iter().zip(vec![0; 10]);
    assert_eq!(par_iter.len(), 10);
    let vec: Vec<_> = par_iter.collect();
    assert_eq!(vec.len(), 10);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
// Собирает зультаты итератора в указанный вектор. Вектор всегда усекается до начала выполнения.
    let mut vec = vec![-1, -2, -3];
    (0..5).into_par_iter().collect_into_vec(&mut vec);
    assert_eq!(vec, [0, 1, 2, 3, 4]);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
// Разархивирует результаты итератора в указанные векторы. Векторы всегда усекаются до начала выполнения.
    let mut left = vec![42; 10];
    let mut right = vec![-1; 10];
    (10..15).into_par_iter().enumerate().unzip_into_vecs(&mut left, &mut right);
    assert_eq!(left, [0, 1, 2, 3, 4]);
    assert_eq!(right, [10, 11, 12, 13, 14]);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
// zip - Итерации над кортежами (A, B), где элементы A из этого итератора, и B из итератора, заданного в качестве аргумента
    let result: Vec<_> = (1..4)
      .into_par_iter()
      .zip(vec!['a', 'b', 'c'])
      .collect();
    assert_eq!(result, [(1, 'a'), (2, 'b'), (3, 'c')]);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
// То же самое Zip, но требует, чтобы оба итератора имели одинаковую длину
    let one = [1u8,2];
    let two:[&str;2] = ["t", "e"];
    let one_iter = one.par_iter();
    let two_iter = two.par_iter();
    let zipped: Vec<(&u8, &&str)> = one_iter.zip_eq(two_iter).collect();
    println!("{:?}",zipped);// [(1, "t"), (2, "e")]
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
// interleave - Перемещайте элементы этого итератора и другого заданного итератора.
    let (x, y) = (vec![1, 2], vec![3, 4, 5, 6]);
    let r: Vec<i32> = x.into_par_iter().interleave(y).collect();
    assert_eq!(r, vec![1, 3, 2, 4, 5, 6]);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
// interleave_shortest - Перемещайте элементы этого итератора и другого заданного итератора, пока он не исчерпан
    let (x, y) = (vec![1, 2, 3, 4], vec![5, 6]);
    let r: Vec<i32> = x.into_par_iter().interleave_shortest(y).collect();
    assert_eq!(r, vec![1, 5, 2, 6, 3]);
}
</code></pre>
