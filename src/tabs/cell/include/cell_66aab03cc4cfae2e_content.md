


<pre><code class="language-rust">
use std::collections::HashMap;
use std::cell::{RefCell, RefMut, Ref};

#[derive(Debug)]     
struct Person(String);
impl Person{
    fn show(&self){  println!("{}",self.0);}
    fn get_key(&self)->&str{ self.0.as_str() }
    fn set_key(&mut self,key:&str){ self.0=key.to_owned(); }
}
fn main(){
    {
        let mut nodes: HashMap<String,Rc<Person>> = HashMap::new();
        let person_rc:Rc<Person> = Rc::new(Person("hello".to_string()));
        nodes.insert("person 1".to_string(), person_rc);
        if let Some(ref mut person_mut_rc) = nodes.get_mut("person 1") {
            unsafe {
                let person_mut:&mut Person = Rc::get_mut_unchecked(person_mut_rc);// если get_mut неразрешено
                person_mut.set_key("new key 3");
            }   
        }
        if let Some(ref person_rc) = nodes.get("person 1") {
            println!("{}",person_rc.get_key());
        }
    }

    // Что бы избавиться от необходимости брать изменяемую ссылку с HashMap и Rc, можно обернуть данные в RefCell
    {
        //use std::borrow::BorrowMut;// мешает, выдает ошибку:  no method named `set_key` found for reference `&&Rc<RefCell<Person>>`
        let mut nodes: HashMap<String,Rc<RefCell<Person>>> = HashMap::new();
        let person_rc:Rc<RefCell<Person>> = Rc::new(RefCell::new(Person("hello3".to_string())));
        nodes.insert("person 1".to_string(), person_rc);
        if let Some(ref person_rc) = nodes.get("person 1") {
           let mut reference = person_rc.borrow_mut();
           (*reference).set_key("hello2");
           println!("{:?}", reference.get_key());
        } 
    }
}
</code></pre>
