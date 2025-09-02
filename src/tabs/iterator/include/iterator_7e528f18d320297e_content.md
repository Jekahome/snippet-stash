

<pre><code class="language-rust">
fn main(){
// try_fold_with Выполните ложную параллельную складку с клонируемым init значением.
//Это объединяет init семантику fold_with() и семантику отказа try_fold()
    let bytes = 0..22_u8;
    let sum = bytes.into_par_iter()
        .try_fold_with(0_u32, |a: u32, b: u8| a.checked_add(b as u32))
        .try_reduce(|| 0, u32::checked_add);
    assert_eq!(sum, Some((0..22).sum()));
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
// sum
    let a = [1, 5, 7];
    let sum: i32 = a.par_iter().sum();
    assert_eq!(sum, 13);

    //product Умножает все элементы в итераторе.
    fn factorial(n: u32) -> u32 {
        (1..n+1).into_par_iter().product()
    }
    assert_eq!(factorial(0), 1);
    assert_eq!(factorial(1), 1);
    assert_eq!(factorial(5), 120);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
// min() max()
    let a = [-3_i32, 34, 2, 5, -10, -3, -23];
    assert_eq!(a.par_iter().min(), Some(&-23));
    assert_eq!(a.par_iter().min_by(|x, y| x.cmp(y)), Some(&-23));
    assert_eq!(a.par_iter().min_by_key(|x| x.abs()), Some(&2));
    assert_eq!(a.par_iter().max(), Some(&34));
    assert_eq!(a.par_iter().max_by(|x, y| x.abs().cmp(&y.abs())), Some(&34));
    assert_eq!(a.par_iter().max_by_key(|x| x.abs()), Some(&34));
}
</code></pre>
