

Перемешивание массива
<pre><code class="language-rust">
use rand::seq::SliceRandom;

fn main() {
    let mut rng = rand::thread_rng();
    let mut numbers = [1, 2, 3, 4, 5];
    numbers.shuffle(&mut rng);

    println!("Shuffled array: {:?}", numbers);
}

</code></pre>
