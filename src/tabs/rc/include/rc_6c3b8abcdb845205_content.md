


<pre><code class="language-rust">
fn main(){
use std::any::Any;
use std::rc::Rc;
fn main(){
    if let Ok(mut dialog) = Rc::downcast::<Dialog>(mediator) { .... }
}
</code></pre>

---

<pre><code class="language-rust">
fn print_if_string(value: Rc<dyn Any>) {
    if let Ok(string) = value.downcast::<String>() {
        println!("String ({}): {}", string.len(), string);
    }
}
fn main(){
    let my_string = "Hello World".to_string();
    print_if_string(Rc::new(my_string));
    print_if_string(Rc::new(0i8));
}
</code></pre>
