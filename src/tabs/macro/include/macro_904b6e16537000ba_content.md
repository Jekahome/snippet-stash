


<pre><code class="language-rust">
// `min!` посчитает минимальное число аргументов.
macro_rules! find_min {
    // Простой вариант:
    ($x:expr) => ($x);
    
    // `$x` следует хотя бы одному `$y,`
    ($x:expr, $($y:expr),+) => (
        //Рекурсивно вызовем `find_min!` на конце `$y`
        std::cmp::min($x, find_min!($($y),+))
    )
}
println!("{}", find_min!(1u32));
println!("{}", find_min!(1u32 + 2 , 2u32));
println!("{}", find_min!(5u32, 2u32 * 3, 4u32));
</code></pre>
