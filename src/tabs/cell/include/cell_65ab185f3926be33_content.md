


<pre><code class="language-rust">
use std::cell::{RefCell, Ref, RefMut};
use std::rc::Rc;

fn main(){
    let mut r:Rc<RefCell<String>> = Rc::new(RefCell::new("hello".to_owned()));

    {
       // Rс реализует трейт Borrow и Deref т.е. можно получить не мутабельную ссылку
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
