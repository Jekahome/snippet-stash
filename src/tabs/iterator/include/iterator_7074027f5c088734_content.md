


<pre><code class="language-rust">
fn main(){
// for_each
// два потока всего выделяет ?
    (1..6).into_par_iter().for_each(|x| { if x%2==0 {std::thread::sleep( std::time::Duration::new(2, 00000000));} println!("{:?}", x) });
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
// for_each_with
    //initЗначение будет клонирован только по мере необходимости , чтобы быть в паре с группой элементов в каждом районе работы. Для этого не требуется тип Sync.
    let (sender, receiver) = channel();
    (1..6).into_par_iter().for_each_with(sender, |s, x|{ s.send(x).unwrap()} );
    let mut res: Vec<_> = receiver.iter().collect();
    res.sort();
   // assert_eq!(&res[..], &[0, 1, 2, 3, 4])
    println!("{:?}", res)
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
// try_for_each - Выполняет OP параллельную попытку для каждого элемента, созданного итератором.
       use std::io::Write;
        (0..10).into_par_iter()
        .try_for_each(|x| {writeln!(std::io::stdout(), "{:?}", x)})
        .expect("expected no write errors");
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
// try_for_each_with - Выполняет параллельную ошибку OPс заданным initзначением с каждым элементом, созданным итератором.
// Это объединяет initсемантику for_each_with()и семантику отказа try_for_each()
    let (sender, receiver) = channel();
    (0..5).into_par_iter()
        .try_for_each_with(sender, |s, x| s.send(x))
        .expect("expected no send errors");
    let mut res: Vec<_> = receiver.iter().collect();
    res.sort();
    assert_eq!(&res[..], &[0, 1, 2, 3, 4]);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
// count - Подсчитывает количество элементов в этом параллельном итераторе.
    let count = (0..100).into_par_iter().count();
    assert_eq!(count, 100);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
// map - Применяется map_op к каждому элементу этого итератора, создавая новый итератор с результатами
    let mut par_iter = (0..5).into_par_iter().map(|x| x * 2);
    let doubles: Vec<_> = par_iter.collect();
    assert_eq!(&doubles[..], &[0, 2, 4, 6, 8]);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
// cloned - Создает итератор, который клонирует все его элементы. Это может быть полезно, когда у вас есть итератор &T, но вам нужно T.
    let a = [1, 2, 3];
    let v_cloned: Vec<_> = a.par_iter().cloned().collect();
    let v_map: Vec<_> = a.par_iter().map(|&x| x).collect();
    assert_eq!(v_cloned, vec![1, 2, 3]);
    assert_eq!(v_map, vec![1, 2, 3]);
}
</code></pre>
