


<pre><code class="language-rust">
trait Base{
    type N;
    type M:std::fmt::Debug;
    fn show(&self,n:Self::N)->Self::M;
}
struct User{
    name:String
}
impl Base for User{
    type N = u32;
    type M = String;
    fn show(&self,n:Self::N)->Self::M{
        n.to_string()
    }
}
fn test2<T:Base<N=u32,M=String>> (val:&T,  n:u32) {
    println!("{:?}", val.show(n) );
}
fn test (val:&Base<N=u32,M=String>,  n:u32) {
    println!("{:?}", val.show(n) );
}
fn main() {
    let o:User = User{name:String::from("Egor")};
    println!("{}", o.show(8));
    test(&o,8_u32);
    let v:Vec<Box<Base<N=u32,M=String>>> = vec![Box::new(o)];
}
</code></pre>
