


<pre><code class="language-rust">
#![feature(portable_simd)] // Включение функции std::simd
use std::simd::{Simd, SimdPartialEq, SimdFloat};
fn main() {
    // Создаем SIMD-векторы с 4 элементами типа f32
    let a = Simd::<f32, 4>::from_array([1.0, 2.0, 3.0, 4.0]);
    let b = Simd::<f32, 4>::from_array([5.0, 6.0, 7.0, 8.0]);

    // Арифметические операции
    let sum = a + b;
    let product = a * b;

    println!("Sum: {:?}", sum); // Вывод: Simd([6.0, 8.0, 10.0, 12.0])
    println!("Product: {:?}", product); // Вывод: Simd([5.0, 12.0, 21.0, 32.0])

    // Сравнения
    let comparison = a.lanes_eq(b);
    println!("Comparison: {:?}", comparison); // Вывод: Mask([false, false, false, false])

    // Логические операции
    let mask = a.lanes_gt(Simd::splat(2.0)); // > 2.0
    println!("Mask: {:?}", mask); // Вывод: Mask([false, false, true, true])

    // Условные выборки
    let result = mask.select(a, b);
    println!("Select: {:?}", result); // Вывод: Simd([5.0, 6.0, 3.0, 4.0])
}

</code></pre>
