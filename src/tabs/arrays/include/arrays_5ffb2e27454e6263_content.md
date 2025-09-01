

Создание массива случайных чисел (в сочетании с rand):
<pre><code class="language-rust">
use std::array;
use rand::Rng;

fn main() {
    let mut rng = rand::thread_rng();
    let random_array: [i32;10] = array::from_fn(|_| rng.gen_range(1..=10));
    println!("{:?}", random_array); // Пример: [3, 7, 1, 10, 5]
// ------------------------------ 
    let arr:[&str;10] = array::from_fn(|i| format!("Element {}", i)); // ["Element 0", "Element 1", ...]
}
</code></pre>
