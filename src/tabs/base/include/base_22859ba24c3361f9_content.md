


<pre><code class="language-rust">
use std::cmp::PartialEq; 
use std::convert::AsRef;

struct Foo< T>(T);
impl < T>Foo< T>{
    fn new(v: T)->Self{
        Self(v)
    }
}
// В методах структуры сохраняется тип T при первом вызове и остается для этого типа навсегда
// при создании и только он будет подставляться в момент вызова
// Для возможности использовать str или String следует 
// 1. Писать в аргументах impl AsRef< str>
// 2. Либо снова определять новый тип < V:AsRef< str>> не подвязанный на типе подвязанном при создании структуры
impl < T:AsRef< str> + PartialEq>Foo< T>{
    fn cmp_good(&self,v:impl AsRef< str>)->bool{
        v.as_ref() == self.0.as_ref()
    }
    fn cmp_good_2< V:AsRef< str> + PartialEq>(&self, v:V)->bool{
        v.as_ref() == self.0.as_ref()
    }
    fn cmp_static(a:&str, b: T)->bool{
        a == b.as_ref()
    }
}
// тут не сохраняется тип между вызовами поэтому можно вызвать str или String
fn ext_cmp< T: AsRef< str>>(s: T) {
   assert_eq!("hello", s.as_ref());
}
fn main() {
    let f:Foo< String> = Foo::new("hello".to_owned());
    f.cmp_good("hello");
    f.cmp_good_2("hello");
    Foo::cmp_static("hello","hello");
    f.cmp_good("hello".to_owned());
    f.cmp_good_2("hello".to_owned());
    Foo::cmp_static("hello","hello".to_owned());
   
    let s = "hello";
    ext_cmp(s);
    let s = "hello".to_string();
    ext_cmp(s);
}
-------------------------------------------------------------------------
//или более обобщенный вид
impl < T: PartialEq>Foo< T>{
    fn cmp_good< V:PartialEq+ ?Sized>(&self, v:impl AsRef< V>)->bool where T:AsRef< V>{
        v.as_ref() == self.0.as_ref()
    }
}
let f:Foo< String> = Foo::new("hello".to_owned());
f.cmp_good::< str>("hello");
</code></pre>
