


<pre><code class="language-rust">
use std::any::Any;
fn main(){
   let a1:A1=A1{};
   let mut a2:A2=A2{};
   test(&a1,&mut a2);
   test(&String::from("Hello"),&mut 100i8);
}

trait B:Any{}
#[derive(Debug)]
struct A1{}
#[derive(Debug)]
struct A2{}
impl B for A1{}
impl B for A2{}

fn test<T: Any + Debug>(value: &T,value2: &mut Any){
 let value_any = value as &Any;
    if value_any.is::<String>() {
         if let Some(as_string) = value_any.downcast_ref::<String>(){
            println!("String ({}): {}", as_string.len(), as_string);
         }
    }else if value_any.is::<A1>() {
         if let Some(as_A1) = value_any.downcast_ref::<A1>(){
            println!("A1: {:?}", as_A1);
         }
    }else if value_any.is::<A2>() {
         if let Some(as_A2) = value_any.downcast_ref::<A2>(){
            println!("A2: {:?}", as_A2);
         }
    }
}
</code></pre>
