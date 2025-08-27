



```rust
use std::borrow::Borrow;
use std::borrow::BorrowMut;
use std::fmt::Debug;
#[derive(Debug,Clone)]
struct Wrap(String);

impl Borrow<String> for Wrap {
    #[inline]
    fn borrow(&self) -> &String { &self.0}
}
impl BorrowMut<String> for Wrap {
    #[inline]
    fn borrow_mut(&mut self) -> &mut String { &mut self.0}
}
impl Borrow<String> for &Wrap {
    #[inline]
    fn borrow(&self) -> &String { &self.0}
}
impl Borrow<String> for &mut Wrap {
    #[inline]
    fn borrow(&self) -> &String { &self.0}
}
impl BorrowMut<String> for &mut Wrap {
    #[inline]
    fn borrow_mut(&mut self) -> &mut String { &mut self.0}
}
impl AsRef<String> for Wrap {
    fn as_ref(&self) -> &String { &self.0}
}
impl AsMut<String> for Wrap {
    fn as_mut(&mut self) -> &mut String {  &mut self.0 }
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
   let mut w = Wrap(String::from("..."));
   let _:&mut String = w.borrow_mut();

   let mut w = Wrap(String::from("..."));
   generic_borrow_mut(&mut w,"");// и &mut T
   generic_borrow(&mut w);
   generic_borrow(&w);// и &T
   generic_borrow_mut(w,"");// и T
   let w = Wrap(String::from("..."));
   generic_borrow(w);// и T


   let mut w = Wrap(String::from("..."));
   generic_as_mut(&mut w,"+");
   generic_as_mut(w,"+");
   let w = Wrap(String::from("..."));
   generic_as_ref_shared(&w);
   generic_as_ref_shared(w);
}
```
