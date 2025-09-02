

Компилятор не может определить размер выделяемой памяти для этих данных так как они рекурсивны
<pre><code class="language-rust">
// recursive type has infinite size
enum List {
    Cons(i32, List),
    Nil,
}
use List::{Cons, Nil};
fn main() {
    let list = Cons(1, Cons(2, Cons(3, Nil))); // ❌
}
</code></pre>

---

Указатель `Box<T>` имеет фиксированный размер не зависимо от данных
<pre><code class="language-rust">
#[derive(Debug)]
enum List {
    Cons(i32, Box<List>),
    Nil,
}

use List::{Cons, Nil};

fn main() {// ✅
    let list = Cons(1,
                    Box::new(Cons(2,
                                  Box::new(Cons(3,
                                                Box::new(Nil))))));
   println!("{:?}", list);
}

</code></pre>

---
Generic версия
<pre><code class="language-rust">
#[derive(Debug)]
enum List<T> { // ✅
    Cons(T, Box<List<T>>),
    Nil,
}
fn main(){
    let list: List<i32> = List::Cons(1, Box::new(List::Cons(2, Box::new(List::Nil))));
    println!("{:?}", list);
}
</code></pre>

 
