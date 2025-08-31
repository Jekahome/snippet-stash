


<pre><code class="language-rust">
#[derive(Debug)]
pub struct Id{
    identifier:i32,
    len:usize
}
impl Id {
    fn new() -> Id{
       Id{identifier:0,len:0}
    }
}
fn main() {
  let id = Id::new();
  let Id {identifier, ..} = id;
  println!("{} ",  identifier);
  
 let id @ Id {identifier, ..} = Id::new();
 println!("{} {}",id.identifier, identifier);
}
</code></pre>

---

<pre><code class="language-rust">
fn main() {
  struct Matrix(f32, f32, f32, f32);
  let matrix = Matrix(1.1, 1.2, 2.1, 2.2);
  let Matrix(item1, item2,item3,item4) = matrix;
}
</code></pre>

---
 
<pre><code class="language-rust">
struct S{
    x:u8,
    y:u8
}
fn main() {
    let obj:S = S{x:9u8,y:3u8};
    f(obj);
}
fn f( S { x,y }: S){
    println!("S=({},{})",x,y);
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
  struct Date { year: u16, month: u8, day: u8 }
  let deadline = Date { year: 2013, month: 6, day: 25 };
  match deadline {
    Date { year: y, month: 8, day: d } => { println!("{}",(d+2).to_str() + " августа " + y.to_str() + " - резервный срок сдачи проекта" ) },
    Date { year: y, month: m, day: d } => { println!("{}",d.to_str() + "." + m.to_str() + "." + y.to_str() + " - подписание акта сдачи/приёмки" ) }
  }
  let curryear: u16 = deadline.year;
  println( fmt!("В любом случае проект должен быть завершён в %d году", curryear as int ) );
}
</code></pre>
