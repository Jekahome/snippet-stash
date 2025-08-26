

Rust допускает утечку памяти, используя `Rc< T>` и `RefCell< T>`: можно создавать циклические ссылки, где элементы ссылаются друг на друга замыкая круг и в итоге никогда не удаляются. 

Это создает утечки памяти, потому что счетчик ссылок каждого элемента в цикле никогда не достигнет 0, и значения никогда не будут сброшены.

Для предотвращения круговых указателей используют `Weak`
<pre><code class="language-rust">
use std::rc::{Rc, Weak};
use std::cell::RefCell;

#[derive(Debug)]
struct Node {
    value: i32,
    parent: RefCell< Weak< Node>>,
    children: RefCell< Vec< Rc< Node>>>,
}

fn main() {
  // Отсутствие бесконечного вывода указывает на то, что этот код не создавал ссылочный цикл.
 let leaf = Rc::new(Node {
        value: 3,
        parent: RefCell::new(Weak::new()),
        children: RefCell::new(vec![]),
    });

    println!("leaf parent = {:?}", leaf.parent.borrow().upgrade());

    let branch = Rc::new(Node {
        value: 5,
        parent: RefCell::new(Weak::new()),
        children: RefCell::new(vec![Rc::clone(&leaf)]),
    });

    *leaf.parent.borrow_mut() = Rc::downgrade(&branch);

    println!("leaf parent = {:?}", leaf.parent.borrow().upgrade());
}
</code></pre>
