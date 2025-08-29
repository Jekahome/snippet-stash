


<pre><code class="language-rust">
trait Say{
    fn say(&self) where Self: std::fmt::Display{
        println!("say:{}",self);
    }
}
impl Say for i32{}
impl Say for String{}
 
fn main(){
    8.say();
    String::from("hello").say();
}
</code></pre>
