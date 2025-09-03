

<pre><code class="language-rust">
use std::cell::Cell;
#[derive(Debug,Clone,Copy)]
struct Data(i32);
impl Data{
    fn change(&mut self,new:i32){
        self.0=new;
    }
}
#[derive(Debug)]
struct Wrap(Cell<Data>); ❌
impl Wrap{
    fn change(&mut self,new:i32){ // ❌ придется иметь mut методы
        (self.0.get_mut()).change(new);
    }
}
</code></pre>

---

<pre><code class="language-rust">
#[derive(Debug)]
struct Data2(Cell<i32>);
impl Data2{
    fn change(&self,new:i32){
        self.0.set(new);
    }
}
#[derive(Debug)]
struct Wrap2(Data2); ✅
impl Wrap2{
    fn change(&self,new:i32){
        self.0.change(new);
    }
}
fn main() {
   let mut wrap = Wrap(Cell::new(Data(1)));
   let wrap2 = Wrap2(Data2(Cell::new(1)));
   wrap.change(2);
   wrap2.change(2);
   println!("{:?} \n{:?}",wrap,wrap2);
}
</code></pre>
