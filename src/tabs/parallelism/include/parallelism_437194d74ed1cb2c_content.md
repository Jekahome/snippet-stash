

Возвращает параллельный итератор над сегментами, разделенными элементами, которые соответствуют разделителю.
Минимальный элемент из максимальных элементов отрезков разделенных нулем
<pre><code class="language-rust">
fn main(){
    let smallest = [1, 2, 3, 0, 2, 4, 8, 0, 3, 6, 9]
        .par_split(|i| *i == 0)
        .map(|numbers| numbers.iter().max().unwrap())
        .min();
    assert_eq!(Some(&3), smallest);
}
</code></pre>

---

Возвращает параллельный итератор по всем непрерывным окнам длины  window_size. Окна перекрываются.
<pre><code class="language-rust">
fn main(){
    let windows: Vec<_> = [1, 2, 3 , 4].par_windows(2).collect();
    assert_eq!(vec![[1, 2], [2, 3], [3, 4]], windows);
    let windows: Vec<_> = [1, 2, 3 , 4].par_windows(3).collect();
    assert_eq!(vec![[1, 2, 3], [2, 3, 4]], windows);
}
</code></pre>

---

Возвращает параллельный итератор по большей части chunk_size элементов за  self раз. Куски не перекрываются.
<pre><code class="language-rust">
fn main(){
    let chunks: Vec<_> = [1, 2, 3, 4, 5].par_chunks(2).collect();
    assert_eq!(chunks, vec![&[1, 2][..], &[3, 4], &[5]]);

    let array = vec![1, 2, 3, 4, 5,6];
    assert_eq!(array.as_parallel_slice(), [1, 2, 3, 4, 5,6]);
    println!("{:?}", array.as_parallel_slice());
}
</code></pre>
