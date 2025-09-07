

Использование пользовательских распределений
<pre><code class="language-rust">
use rand::distributions::{Distribution, Uniform};

fn main() {
    let between = Uniform::from(10..20); // Равномерное распределение в диапазоне [10, 20)
    let mut rng = rand::thread_rng();

    for _ in 0..5 {
        let number = between.sample(&mut rng);
        println!("Random number: {}", number);
    }
}

</code></pre>
