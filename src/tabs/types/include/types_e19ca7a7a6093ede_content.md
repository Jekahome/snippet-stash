


<pre><code class="language-rust">
use std::fmt::Debug;
// Реализация метода в трейте(аналог абстрактного класса)
// возвращаемый тип организован через type
trait T{
    type F;
    fn show(&self){ // метод по умолчанию, можно переопределить
      println!("show");
    }
    fn work(&self)->Self::F;
}

struct WeatherData;

impl T for WeatherData{
    type F=String;
    fn work(&self)->Self::F{
        "work".to_string()
    }
}
fn main() {
 let w:WeatherData = WeatherData;
 w.show(); // show
 println!("{}",w.work()); // work
}
</code></pre>

---

<pre><code class="language-rust">
fn domain_controller_new_order<'a,T>(uow: &'a mut T) -> ShortResult<()> 
    where T: UnitOfWork<'a, Context=Transaction<'a>>
{...}
</code></pre>

---

<pre><code class="language-rust">
trait Iterable {
    type Item;

    fn iter(&self) -> Iterator<Item = Self::Item>;
}
impl Iterable for Vec<i32> {
    type Item = i32;

    fn iter(&self) -> Iterator<Item = Self::Item> {
        self.iter()
    }
}
</code></pre>




