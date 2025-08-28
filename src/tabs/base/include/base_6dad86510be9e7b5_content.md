

<pre><code class="language-rust">
fn function<F>(f: F) where for<'a> F: FnOnce(&'a Type)
struct Struct<F> where for<'a> F: FnOnce(&'a Type) { x: F }
enum Enum<F> where for<'a> F: FnOnce(&'a Type) { Variant(F) }
impl<F> Struct<F> where for<'a> F: FnOnce(&'a Type) { fn x(&self) -> &F { &self.x } }
</code></pre>


---

Границы типа могут иметь более высокий рейтинг в течение срока службы. 
Эти границы указывают, что ограничение истинно для всех времен жизни. 
Например, для такой привязки `for<'a> &'a T: PartialEq<i32>` потребуется реализация типа
<pre><code class="language-rust">
struct T(i32);
 
impl<'a> std::cmp::PartialEq<i32> for &'a T {
   fn eq(&self, other: &i32) -> bool {self.0==*other}
}

impl<'a> std::cmp::PartialEq<i32> for T {
   fn eq(&self, other: &i32) -> bool {self.0==*other}
}
и затем может использоваться для сравнения &'a T с любым временем жизни с i32
fn main() {
  let t = T(4);
  
  if &t == 4{
      println!("Отработал \"for &'a T\"");
  }
  if t == 4{
      println!("Отработал \"for T\"");
  }
}
</code></pre>

--- 
Здесь может использоваться только граница с более высоким рейтингом, потому что время жизни ссылки короче, чем любой возможный параметр времени жизни в функции:
<pre><code class="language-rust">
fn call_on_ref_zero< F>(f: F)  where for<'a> F: Fn(&'a str)->&'a str {
    let zero:String = "0".to_owned();
     f(&zero) ;
}
</code></pre>


Время жизни с более высоким рейтингом также может быть указано непосредственно перед признаком: единственное различие - это область действия параметра времени жизни, который распространяется только на конец следующего признака, а не на всю границу. 
Эта функция эквивалентна предыдущей.
<pre><code class="language-rust">
fn call_on_ref_zero_2<F>(f: F) where F: for<'a> Fn(&'a str)->&'a str {
    let zero:String = "0".to_owned();
    f(&zero)
}

fn foo(z:&str)->&str{
    println!("z={}",z);
    z
}
call_on_ref_zero(foo);
</code></pre>


