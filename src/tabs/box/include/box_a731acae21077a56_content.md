


<pre><code class="language-rust">
use std::any::Any;

fn print_if_string(value: Box<Any>) {
    if let Ok(string) = value.downcast::<String>() {
        println!("String ({}): {}", string.len(), string);
    }
}
fn main() {
    let my_string = "Hello World".to_string();
    print_if_string(Box::new(my_string));
    print_if_string(Box::new(0i8));
}
</code></pre>
