


<pre><code class="language-rust">
fn sum_of_squares(input: &[i32]) -> i32 {
    // par_iter Преобразует self в параллельный итератор.
    input.par_iter() // <-- просто измените это !
        .map(|&i| i * i)
        .sum()
}
fn main(){
    let v_par: Vec<_> = (0..100).collect();
    println!("{:?}", sum_of_squares(&v_par[..]));

    let mut v_par = [-5, 4, 1, -3];
    println!("{:?}", sum_of_squares(&v_par[..]));
}
</code></pre>
