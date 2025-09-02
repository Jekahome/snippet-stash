

Макрос атрибута Rust, требующий от компилятора доказательства того, что функция никогда не может выйти из строя.
<pre><code class="language-rust">
use no_panic::no_panic;

#[no_panic]
fn demo(s: &str) -> &str {
    &s[1..]
}

fn main() {
    println!("{}", demo("input string"));
}
</code></pre>
