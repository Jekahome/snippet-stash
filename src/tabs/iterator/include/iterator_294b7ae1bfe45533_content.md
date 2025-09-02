


<pre><code class="language-rust">
fn main(){
// fold аналогично последовательному fold но работает паралельно разбывая на несколько блоков и потом их складывая
    let s =
        ['a', 'b', 'c', 'd', 'e']
            .par_iter()
            .fold(|| {String::new()},
                  |mut s: String, c: &char| { s.push(*c); s })
            .reduce(||{String::new()} ,
                    |mut a: String, b: String| { a.push_str(&b); a });
    assert_eq!(s, "abcde");

    let bytes = 0..22_u8;
    let sum = bytes.into_par_iter()
        .fold(|| 0_u32, |a: u32, b: u8| a + (b as u32))
        .sum::<u32>();
    assert_eq!(sum, (0..22).sum());
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
// fold_with - Это работает, по сути, как fold(|| init.clone(), fold_op), за исключением того, что не требуется init тип типа Sync, или любая другая форма добавленной синхронизации.
    let bytes = 0..22_u8;
    let sum = bytes.into_par_iter()
        .fold_with(0_u32, |a: u32, b: u8| a + (b as u32))
        .sum::<u32>();
    assert_eq!(sum, (0..22).sum());
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
// try_fold - Это вариант fold() для операций, которые могут завершиться с ошибкой  Option::Noneили Result::Err.
    let bytes = 0..22_u8;
    let sum = bytes.into_par_iter()
        .try_fold(|| 0_u32, |a: u32, b: u8| a.checked_add(b as u32))
        .try_reduce(|| 0, u32::checked_add);
    assert_eq!(sum, Some((0..22).sum()));
}
</code></pre>
