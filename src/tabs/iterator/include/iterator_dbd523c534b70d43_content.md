


<pre><code class="language-rust">
fn main(){
// inspect - Применяется inspect_op к ссылке на каждый элемент этого итератора, создавая новый итератор, проходящий через исходные элементы.
// Это часто полезно для отладки, чтобы увидеть, что происходит на этапах итератора.
    let a = [1, 4, 2, 3];
    let sum = a.par_iter()
        .cloned()
        .inspect(|x| println!("about to filter: {}", x))
        .filter(|&x| x % 2 == 0)
        .inspect(|x| println!("made it through filter: {}", x))
        .reduce(|| 0, |sum, i| sum + i);
    println!("{}", sum);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
 // update Мутация каждого элемента этого итератора перед его уступкой.
    let par_iter = (0..5).into_par_iter().update(|x| {*x *= 2;});
    let doubles: Vec<_> = par_iter.collect();
    assert_eq!(&doubles[..], &[0, 2, 4, 6, 8]);

    let mut a = [1, 4, 2, 3];
    let par_iter = a.par_iter().update(|mut x| {*x *= 2;});
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
// filter - Применяется filter_op к каждому элементу этого итератора, создавая новый итератор только с элементами, которые дали true результаты.
    let mut par_iter = (0..10).into_par_iter().filter(|x| x % 2 == 0);
    let even_numbers: Vec<_> = par_iter.collect();
    assert_eq!(&even_numbers[..], &[0, 2, 4, 6, 8]);
}
</code></pre>
