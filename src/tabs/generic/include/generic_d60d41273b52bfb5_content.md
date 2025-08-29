


<pre><code class="language-rust">
use std::any::Any;
fn is_string(s: &dyn Any) {
    if s.is::<String>() {
        println!("It's a string!");
    } else {
        println!("Not a string...");
    }
}
fn main() {
    is_string(&0);
    is_string(&"cookie monster".to_string());
}
</code></pre>
