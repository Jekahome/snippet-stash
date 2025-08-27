



```rust
use std::borrow::Borrow;
use std::borrow::BorrowMut;
use std::fmt::Debug;
#[derive(Debug,Clone)]
struct Wrap<T>(T);

impl<T> Borrow<T> for Wrap<T> {
    #[inline]
    fn borrow(&self) -> &T { &self.0}
}
impl<T> BorrowMut<T> for Wrap<T> {
    #[inline]
    fn borrow_mut(&mut self) -> &mut T {&mut self.0 }
}
impl<T> Borrow<T> for &Wrap<T> {
    #[inline]
    fn borrow(&self) -> &T { &self.0}
}
impl<T> Borrow<T> for &mut Wrap<T> {
    #[inline]
    fn borrow(&self) -> &T { &self.0}
}
impl<T> BorrowMut<T> for &mut Wrap<T> {
    #[inline]
    fn borrow_mut(&mut self) -> &mut T { &mut self.0}
}
impl<T> AsRef<T> for Wrap<T> {
    fn as_ref(&self) -> &T { &self.0}
}
impl<T> AsMut<T> for Wrap<T> {
    fn as_mut(&mut self) -> &mut T { &mut self.0}
}
 
// подходит для `&mut T` и `mut T` 
fn generic_borrow_mut<T:BorrowMut<String>+Debug>(mut value:T,data:&str){
    (*value.borrow_mut()).push_str(data);
    println!("{:?}",value.borrow());   
}
// подходит для `&mut T` и `&T` и `T` и `mut T`
fn generic_borrow<T:Borrow<String>+Debug>(value:T){
    println!("{:?}",value.borrow());  
}

// подходит для `&mut T` и `mut T`
fn generic_as_mut<T:AsMut<String>+>(mut value:T,data:&str){
    (*value.as_mut()).push_str(data);
    println!("{:?}",value.as_mut());
}
// подходит для `&mut T` и `&T` и `T` и `mut T`
fn generic_as_ref_shared<T:AsRef<String>>(value:T){
    println!("{:?}",value.as_ref()); 
}
fn main(){
   let mut w = Wrap::<String>(String::from("..."));
   let _:&mut String = w.borrow_mut();// // или <Wrap::<String> as BorrowMut<String>>::borrow_mut(&mut w);
   let _:&String = w.borrow();// или <Wrap::<String> as Borrow<String>>::borrow(&w); 
   
   let mut w = Wrap::<String>(String::from("..."));
   generic_borrow_mut(&mut w,"");// и &mut T
   generic_borrow(&mut w);
   generic_borrow(&w);// и &T
   generic_borrow_mut(w,"");// и T
   let w = Wrap(String::from("..."));
   generic_borrow(w);// и T

   let mut w = Wrap::<String>(String::from("..."));
   generic_as_mut(&mut w,"+");
   generic_as_mut(w,"+");
   let w = Wrap::<String>(String::from("..."));
   generic_as_ref_shared(&w);
   generic_as_ref_shared(w);
}
 
```
