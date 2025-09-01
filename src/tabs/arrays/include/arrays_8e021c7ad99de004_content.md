


<pre><code class="language-rust">
trait MyTrait{
   fn gogo(&mut self);
}
impl <T> MyTrait for [T]{
    fn gogo(&mut self){
        println!("{}",self.len());
    }
}
impl <T> MyTrait for Vec<T> where [T]:MyTrait{
    fn gogo(&mut self){
        println!("{}",self.len());
    }
}
impl MyTrait for i32{
    fn gogo(&mut self){
        println!("{}",self);
    }
}
fn main(){
    let mut v = vec![1,2,3];
    v.gogo();

    [1;5].gogo();
    4_i32.gogo();
}
</code></pre>
