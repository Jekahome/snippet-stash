


<pre><code class="language-rust">
#![feature(portable_simd)]
use std::simd::Simd;
fn main() {
    let data = [1.0f32, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0];
    let mut results = [0.0f32; 8];

    // Размер SIMD-вектора
    let lanes = Simd::<f32, 4>::LANES;

    for (chunk, result_chunk) in data.chunks_exact(lanes).zip(results.chunks_exact_mut(lanes)) {
        let v = Simd::<f32, 4>::from_slice(chunk);
        let squared = v * v; // Квадрат каждого элемента
        squared.write_to_slice(result_chunk);
    }

    println!("Squared results: {:?}", results);
    // Вывод: Squared results: [1.0, 4.0, 9.0, 16.0, 25.0, 36.0, 49.0, 64.0]
}

</code></pre>
