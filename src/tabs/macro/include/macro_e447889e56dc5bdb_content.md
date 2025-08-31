

Пример matching
<pre><code class="language-rust">
// Правая часть может быть (),{},[]
macro_rules! foo {
    (x => $e:expr) => (println!("mode X: {}", $e));
    (y => $e:expr) => {println!("mode Y: {}", $e)};
    (z => $e:expr) => [println!("mode Z: {}", $e)];
}

fn main(){
   foo!(y => 3); // mode Y: 3
}
</code></pre>
