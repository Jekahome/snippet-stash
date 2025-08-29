


выполняют приведение `unsafe` указателя

`unsafe { &*(self as *const dyn Any as *const T) } // self is &dyn Any`

На самом деле, мы можем сделать `Any` стиль `downcast` с любым типажом, проблема только в том, что нам нужно знать тип:
<pre><code class="language-rust">
fn main(){
 let x = &String::from("hello") as &dyn Trait;
 let y: &String = unsafe { &*(x as *const dyn Trait as *const String) };
 println!("bytes: {:?}", y.as_bytes());
}
</code></pre>


Мы могли бы даже реализовать нашу собственную небезопасную downcast функцию dyn Trait:
<pre><code class="language-rust">
trait Trait {}
impl Trait for String {}
impl Trait for u8 {}

impl dyn Trait {
    // SAFETY: I hope you know what you're doing
    unsafe fn downcast<T>(&self) -> &T {
        &*(self as *const dyn Trait as *const T)
    }
}
fn main() {
    let a: &dyn Trait = &42_u8;
    let b: &dyn Trait = &String::from("hello");

    let _number: u8 = *unsafe { a.downcast::<u8>() };
    let _text: &str = unsafe { b.downcast::<String>() };
}
</code></pre>

Суть в том, что нам даже не нужен трейт `Any`, что действительно важно `TypeId::of::<T>()`, так это то `Any`, что он упрощает нашу жизнь, предоставляя эту функциональность с помощью стабильного `API`
