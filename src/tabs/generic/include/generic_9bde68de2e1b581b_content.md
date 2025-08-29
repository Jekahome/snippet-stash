


<pre><code class="language-rust">
use std::fmt::Debug;
trait Something{
    fn print(self);
    fn print_self(&self) where Self:Debug{
        println!("{:?}",self);
    }
}
impl<T> Something for T where T:Debug {
    fn print(self) {
        println!("{:?}", self);
    }
}
fn main() {
    let vec = vec![1, 2, 3];
    vec.print_self();
    vec.print();
    
    let s = String::from("hello");
    s.print_self();
    s.print();
}
</code></pre>
