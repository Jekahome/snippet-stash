


<pre><code class="language-rust">
trait T{
    fn foo(&self,v:i32)->Result<i32,()>;
} 
struct UserId;
impl T for UserId{
    fn foo(&self,v:i32)->Result<i32,()>{
        Ok(v*v)
    }
}
fn main(){
  let u:UserId = UserId;
  let u = &u as &T;
  assert_eq!(25,u.foo(5).unwrap());
}
</code></pre>

Или завернуть impl в макрос
<pre><code class="language-rust">
macro_rules! impl_t {
  ( ($body:expr,$item:ty) ) => {
  {
        impl T for $item {
           fn foo(&self,v:i32)->Result<i32,()>{
              $body(v)
           }
        }
  }
 }
}
fn main(){
 let v = impl_t!( 
   (
    |v:i32|->Result<i32,()>{Ok(v*v)},
    UserId
   )
 );
}
</code></pre>
