


<pre><code class="language-rust">
#[derive(Debug,Clone)]
enum T{
    INT(i32),
    STRING(String),
    FLOAT(f32)
}
use std::convert::From;
impl From<T> for i32 {
    fn from(item: T) -> i32 {
       match item {
           T::INT(e) => e,
           _ => panic!("Type error")
       }
    }
}
impl From<T> for String {
    fn from(item: T) -> String {
       match item {
           T::STRING(e) => e,
           _ => panic!("Type error")
       }
    }
}
fn main() {
 let v:Vec<T> = vec![T::INT(2),T::STRING("Hello".to_owned())];
 let i:i32 = v[0].clone().into();
 let s:String = v[1].clone().into();
 
 println!("{} {}",i ,s);
}
</code></pre>
