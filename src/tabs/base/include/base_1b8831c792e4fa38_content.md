


<pre><code class="language-rust">
use std::cmp::PartialEq; 
use std::convert::AsRef;
use std::marker::PhantomData;

pub trait TWrapKey< Q: ?Sized>:AsRef< Q>{}
pub struct WrapKey< T: ?Sized>(pub T);
impl< T: ?Sized> AsRef< T> for WrapKey< T>{
    fn as_ref(&self)->&T{
        &self.0
    }
}
impl< T> TWrapKey< T> for WrapKey< T>{}

pub struct Foo< U,T>(T,PhantomData< U>);

impl < U,T:TWrapKey< U>>Foo< U,T>{
    pub fn new(key:T)->Self{
        Self(key,PhantomData)
    }
}
impl < U:PartialEq,T: TWrapKey< U>>Foo< U,T>{
    pub fn cmp< Q:PartialEq< U> + ?Sized>(&self,v:impl TWrapKey< Q>)->bool {
        v.as_ref() == self.0.as_ref()
    } 
}

fn ext_cmp< T: AsRef< str>>(s: T) {
   assert_eq!("hello", s.as_ref());
}
// Для возможности использовать любой тип реализующий AsRef и PartialEq используя тип T через ссылку &T в ф-ции cmp
fn main() {
    let f/*:Foo< i32,_>*/ = Foo::new(WrapKey(1));
    let wrap = WrapKey(1);
    assert!(f.cmp(wrap));
  
    let f/*:Foo< String,_>*/ = Foo::new(WrapKey("hello".to_owned()));
    let wrap = WrapKey("hello");
    assert!(f.cmp(wrap));
    let wrap = WrapKey("hello".to_owned());
    assert!(f.cmp(wrap));
}
</code></pre>
