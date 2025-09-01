


<pre><code class="language-rust">
fn main(){
    let mut even_sum_squares = 0;
    let mut even_count = 0;
    for i in 0..values.len() {
        if values[i] % 2 != 0 {
            continue;
        }
        even_sum_squares += values[i] * values[i];
        even_count += 1;
        if even_count == 5 {
            break;
        }
    }

// Преобразование:
    let even_sum_squares: u64 = values
        .iter()
        .filter(|x| *x % 2 == 0)
        .take(5)
        .map(|x| x * x)
        .sum();
}
</code></pre>
