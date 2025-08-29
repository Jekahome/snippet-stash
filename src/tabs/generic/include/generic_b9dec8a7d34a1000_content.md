

Или когда у вас есть некий контекст, который всегда устраняет неоднозначность параметра неявной черты
<pre><code class="language-rust">
use std::marker::PhantomData;
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

struct PetList<M, T> {
  pets: Vec<T>,
  _marker: PhantomData<M> // needed to satisfy rustc
}

impl<M, T: Noise<M>> PetList<M, T> {
  fn new() -> Self {
    PetList { 
      pets: Vec::new(),
      _marker: PhantomData
    }
  }
  fn push(&mut self, pet: T) {
    self.pets.push(pet);
  }
  fn everyone_is_yapping(&self) {
    for pet in &self.pets {
      pet.make_noise();
    }
  }
}
fn main() {
  // Specify `Loud` once up front, and never again!
  let mut pets: PetList<Loud, Cat> = PetList::new();
  pets.push(Cat);
  pets.everyone_is_yapping();
}
</code></pre>
