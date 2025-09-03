


<pre><code class="language-rust">
use std::cell::{RefCell, Ref, RefMut};
use std::rc::Rc;
fn main(){
    let mut r:Rc<RefCell<String>> = Rc::new(RefCell::new("hello".to_owned()));
    {
        // Rс реализует трейт Borrow т.е. можно получить не мутабельную ссылку
        let ref_cell:Ref<String> = r.borrow();
        let s:String = (&ref_cell).to_string(); 
        println!("{}",s);
    }
    // Rc получение мутабельной ссылки
    let ref_cell_mut:RefMut<String> = r.borrow_mut();
    let s:String = (&ref_cell_mut).to_string();
    println!("{}",s);

// или так , но один вариант будет отрабатывать,два раза мутабельную ссылку Rc невзять
// Rc получение мутабельной ссылки 
    if let Some(r_mut) = Rc::get_mut(&mut r){
       let s:&String = &*r_mut.borrow();
       println!("{}",s);
    }
}
</code></pre>

---

<pre><code class="language-rust">
struct Node{
   left:Option<Rc<Node>>
}
fn main(){
    if let Some(n) = &mut self.left{
         (*Rc::<Node>::get_mut(n).unwrap()).your_mut_method(node);
    }
}
</code></pre>
 
---

Тут Rc методы напрямую не участвуют, по идее срабатывает Borrow.
Rc получение не мутабельной ссылки.
<pre><code class="language-rust">
pub fn search(&self,key:&str)->Option<&Node>{
    if let Some(node_rc) = self.nodes.get(key){ 
        if let Ok(node_ref) = node_rc.try_borrow(){// impl RefCell fn try_borrow() 
            return Some(std::cell::Ref::leak(node_ref));
        }
    }
    None
}
fn main(){
    let mut nodes: HashMap<String,Rc<RefCell<Node>>> = HashMap::new();
    let node_new:Rc<RefCell<Node>> = Rc::new(RefCell::new(node));
    nodes.insert("key".to_string(), node_new);
}
</code></pre>
