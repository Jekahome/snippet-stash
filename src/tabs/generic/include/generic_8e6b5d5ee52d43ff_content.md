

Ссылки на тип `Sized` это тонкие указатели т.е. просто адрес в памяти на данные, а `traite object` реализуются толстыми указателями и имеет два адреса, одни для данных, другой для `vtable` для реализации этой черты для конкретного типа, стоящего за объектом черты и используя `trait object` настоящий тип стирается т.е. вы не знаете базовый тип поэтому вы не можете вызвать метод использующий `Self` потому что это конкретный тип, но можно сделать эти методы недоступными для trait object пометив их `Sized`
<pre><code class="language-rust">
trait Foo {
  fn dont_need_sized(&self);
  fn need_sized(self) -> Self where Self: Sized;// пометили запрет для trait object
}
struct Bar{}

impl Foo for Bar { 
    fn dont_need_sized(&self) {
      println!("dont_need_sized");
   }
   // реализуем но не сможем использовать через trait object 
   fn need_sized(self) -> Self where Self: Sized{
       self
   }
}

fn test_DST(x:&dyn Foo){
    x.dont_need_sized();
}
fn test(x:Bar)->Bar{
    x.need_sized()
}
fn main() {
   let x: &dyn Foo = &Bar{};
   x.dont_need_sized();
  // x.need_sized();// error: the `need_sized` method cannot be invoked on a trait object
  
  test_DST(&Bar{});// Ok
  test(Bar{});// Ok
}
</code></pre>
