

Основная задача ввести параметр-характеристику, который предотвращает конфликт двух реализаций
<pre><code class="language-rust">
trait Noise<M> {
  fn make_noise(&self);
}

struct Quiet;
struct Loud;

struct Cat;

impl Noise<Quiet> for Cat {
  fn make_noise(&self) {
    println!("meow");
  }
}
impl Noise<Loud> for Cat {
  fn make_noise(&self) {
    println!("MRRROOOOOOW");
  }
}
fn main() {
  <Cat as Noise<Quiet>>::make_noise(&Cat);// Для компиляции вам придется написать уродливый полный путь
}
</code></pre>
