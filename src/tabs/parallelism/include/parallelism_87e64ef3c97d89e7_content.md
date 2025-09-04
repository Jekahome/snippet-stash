


<pre><code class="language-rust">
#![feature(portable_simd)]
use std::simd::{Simd, SimdSwizzle};
fn main() {
    let a = Simd::<i32, 4>::from_array([10, 20, 30, 40]);

    // Перестановка элементов
    let swizzled = a.swizzle::<{ [3, 2, 1, 0] }>();
    println!("Swizzled: {:?}", swizzled); // Вывод: Simd([40, 30, 20, 10])
}
</code></pre>
