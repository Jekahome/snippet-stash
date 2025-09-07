


<pre><code class="language-rust">
use rand::Rng;

fn main() {
    let mut rng = rand::thread_rng();
    
    // Случайное число в диапазоне
    let num: i32 = rng.gen_range(1..=100);
    
    // Случайное bool значение
    let boolean: bool = rng.gen();
    
    // Перемешивание вектора
    let mut vec = vec![1, 2, 3, 4, 5];
    rng.shuffle(&mut vec);
}
</code></pre>
