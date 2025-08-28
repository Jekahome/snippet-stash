


<pre><code class="language-rust">
use std::ops::{Deref, DerefMut};
struct WrapDeref<T> { value: T}
impl<T> Deref for WrapDeref<T> {
    type Target = T;
    fn deref(&self) -> &Self::Target { &self.value}
}
impl<T> DerefMut for WrapDeref<T> {
    fn deref_mut(&mut self) -> &mut Self::Target { &mut self.value }
}
fn generic_deref_mut<T:DerefMut+Deref<Target=String>>(value:&mut T) /*where T::Target:Display+Debug*/{
    (*value).push('z');
    let v:String=(*Deref::deref(&value)).to_string();
    let v:String=(*value).to_string();
    println!("{}",v);
}
fn generic_deref<T:Deref<Target=String>>(value:&T) {
    let v:String=(*Deref::deref(&value)).to_string();
    let v:String=(*value).to_string();
    println!("{}",v);
}
fn main(){
   let mut x:WrapDeref<char> = WrapDeref { value: 'a' };
   *x = 'b'; // DerefMut
   assert_eq!('b', x.value);

   let mut x:WrapDeref<String> = WrapDeref { value: "a".to_string() };
   (*x).push('b'); // DerefMut
   (*DerefMut::deref_mut(&mut x)).push('c');
   generic_deref_mut(&mut x);
   assert_eq!("abcz".to_string(), x.value);

   let x:WrapDeref<String> = WrapDeref { value: "a".to_string() };
   assert_eq!("a".to_string(), *x); // Deref
   assert_eq!("a".to_string(), *Deref::deref(&x));
   generic_deref(&x);

   /*
    Deref coercion (принуждении)
    Если `T` реализует `Deref<Target = U>` и `x` является значением типа `T`, то:

    1.`*x` (где `T` не является ни ссылкой, ни необработанным указателем) эквивалентно `*Deref::deref(&x)`/`*DerefMut::deref_mut(&mut x)`
    2.Значения типа `&T` приводятся к значениям типа `&U`
    3.`T` неявно реализует все методы типа `U`
    */
    let mut x:WrapDeref<String> = WrapDeref { value: "a".to_string() };
    assert_eq!(*x,"a".to_string());
    assert_eq!(*x,*Deref::deref(&x));// 1
    let s:&String = (&x);// 2
    let s:&mut String = (&mut x);// 2
    s.push_str("b");

    x.push_str("c");// 3
    let slice:&[u8]=x.as_bytes();// 3
    assert_eq!(slice,"abc".to_string().as_bytes());
}
</code></pre>
