


<pre><code class="language-rust">
fn main(){
// min - Устанавливает минимальную длину итераторов, желаемых для обработки в каждом потоке. Район не будет разделяться меньше, чем эта длина, но, конечно, итератор уже может быть меньшим для начала.
// Производители любят zipи interleave будут использовать больше двух минимумов. Цепные итераторы и итераторы внутри flat_mapмогут использовать свою минимальную длину.
// with_min_len
    let min = (0..1_000_000)
        .into_par_iter()
        .with_min_len(1234)
        .fold(|| 0, |acc, _| acc + 1) // count how many are in this segment
        .min().unwrap();
    assert!(min >= 1234);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
// with_max_len
    let max = (0..1_000_000)
        .into_par_iter()
        .with_max_len(1234)
        .fold(|| 0, |acc, _| acc + 1) // count how many are in this segment
        .max().unwrap();
    assert!(max <= 1234);
}
</code></pre>
