


<pre><code class="language-rust">
fn main(){
//Применяется filter_op к каждому элементу этого итератора для получения Option, создавая новый итератор только с элементами из Some результатов
    let mut par_iter = (0..10).into_par_iter()
        .filter_map(|x| {
            if x % 2 == 0 { Some(x * 3) }
                else { None }
        });
    let even_numbers: Vec<_> = par_iter.collect();
    assert_eq!(&even_numbers[..], &[0, 6, 12, 18, 24]);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    // Применяется map_op к каждому элементу этого итератора, чтобы получить вложенные итераторы, создавая новый итератор, который выравнивает их обратно в один.
    // to_vec() Срез копирует себя в Vec
    let a = [[1, 2], [3, 4], [5, 6], [7, 8]];
    let par_iter = a.par_iter().cloned().flat_map(|a| a.to_vec());
    let vec: Vec<_> = par_iter.collect();
    assert_eq!(&vec[..], &[1, 2, 3, 4, 5, 6, 7, 8]);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
 // flatten Адаптер, который сглаживает итерируемые Items в один большой итератор.
    // как flat_map только работает с векторами
    let x: Vec<Vec<_>> = vec![vec![1, 2], vec![3, 4]];
    let y: Vec<_> = x.into_par_iter().flatten().collect();
    assert_eq!(y, vec![1, 2, 3, 4]);
}
</code></pre>
