

Выбор случайного элемента из массива
<pre><code class="language-rust">
use rand::seq::SliceRandom;

fn main() {
    let mut rng = rand::thread_rng();
    let options = ["Alice", "Bob", "Carol"];
    if let Some(choice) = options.choose(&mut rng) {
        println!("Random choice: {}", choice);
    }
}
</code></pre>
