


<pre><code class="language-rust">
use std::ops::Deref;
use std::fmt::Debug;

#[derive(Debug)]
struct Wrap<T>(Option<T>); // wrapper struct
impl<T> Deref for Wrap<T> {
    type Target = Option<T>; // Our wrapper struct will coerce into Option
    fn deref(&self) -> &Option<T> {
        &self.0 // We just extract the inner element
    }
}
impl<T: Debug> Wrap<T> {
    fn print_inner(&self) {
        println!("{:?}", self.0)
    }
}
fn fn_that_takes_option<T: Debug>(x: &Option<T>) {
    println!("{:?}", x)
}
fn main() {
    let x = Wrap(Some(1)); 
    println!("{}",x.is_some());
    println!("{:?}",x.map(|x| x + 1)); 
    fn_that_takes_option(&x); 
    x.print_inner() 
}
</code></pre>
