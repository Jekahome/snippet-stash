


<pre><code class="language-rust">
#![feature(portable_simd)]
use std::simd::Simd;
fn main() {
    let row1 = Simd::<f32, 4>::from_array([1.0, 0.0, 0.0, 0.0]);
    let row2 = Simd::<f32, 4>::from_array([0.0, 1.0, 0.0, 0.0]);

    let column = Simd::<f32, 4>::from_array([5.0, 6.0, 7.0, 8.0]);

    let result1 = row1 * column;
    let result2 = row2 * column;

    println!("Row1 * Column: {:?}", result1); // Вывод: Simd([5.0, 0.0, 0.0, 0.0])
    println!("Row2 * Column: {:?}", result2); // Вывод: Simd([0.0, 6.0, 0.0, 0.0])
}
</code></pre>
