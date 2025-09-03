

 Граф a 5->10->Nil
           b 3->a
           c 4->a

<pre><code class="language-rust">
fn main(){
    //enum List { Cons(i32, Box<List>), Nil, }
    let a = Cons(5,  Box::new( Cons(10, Box::new(Nil)))); ❌
    // ошибка владения
    let b = Cons(3, Box::new(a));
    let c = Cons(4, Box::new(a));
}
</code></pre>

<pre><code class="language-rust">
use std::rc::Rc;
use List::{Cons, Nil};
enum List { Cons(i32, Rc<List>),Nil } ✅
fn main(){
// Вызов Rc::clone только увеличивает счетчик ссылок,и не копирует данные и не занимает много времени в отличии от a.clone
    let a = Rc::new(Cons(5, Rc::new(Cons(10, Rc::new(Nil)))));
    let b = Cons(3, Rc::clone(&a));
    let c = Cons(4, Rc::clone(&a));
}
</code></pre>

<div class="mdbook-graphviz-output">
digraph {
   5->10->Nil
   3->5
   4->5
}
</div>


