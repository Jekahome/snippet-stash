


<pre><code class="language-rust">
use core::fmt::Debug;
trait MyTrait{
    fn print(&self) where Self: Debug{
        println!("{:?}",&self);
    }
}
#[derive(Debug)]
struct A;
#[derive(Debug)]
enum B{
    a,b
}
impl MyTrait for A{}  
impl MyTrait for B{}

fn main() {
    let s = A;
    let e = B::b;
    s.print();
    e.print();
}
</code></pre>
