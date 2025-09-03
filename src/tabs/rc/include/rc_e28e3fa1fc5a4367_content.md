


<pre><code class="language-rust">
use std::rc::{Rc,Weak};
#[derive(Debug)]
struct Node{
    name:String,
    value:Option<Weak<Node>>
}
impl Node{
    fn new(name:String)->Self{
        Self{name,value:None}
    }
    fn set_value(&mut self,value:Rc<Node>){
        self.value = Some(Rc::downgrade(&value));
    }
}
impl Drop for Node {
    fn drop(&mut self) {
        println!("Drop {}", &self.name);
    }
}
// С файлом Weak. Вы должны превратить его в Rc(или Arc) сначала использовать upgrade.
// И это либо удастся (если Tон все еще есть), либо нет

// Если у вас есть Weak, вы не можете напрямую получить доступ к его содержимому.
// Сначала вам нужно обновить его до Rc использования upgrade метода, который дает вам, Some(Rc) если контент все еще жив, или None если контент был уничтожен (сильное значение счетчика ссылок равно нулю).
// Итак, чтобы получить доступ к содержимому Weak, вы сначала должны получить Rc,
// и это гарантирует вам, что содержимое не будет уничтожено, пока вы его используете, поскольку у него есть по крайней мере один владелец.
fn main(){
    {
        let mut node = Node::new("Node 1".into());
        let mut node2 = Node::new("Node 2".into());
        let rc = Rc::new(node2);
        node.set_value(Rc::clone(&rc));
        // все слабые указатели Weak еще могут получить владеющий указатель Rc, так как он еще жив 
        let w:&Weak<Node> = node.value.as_ref().unwrap();
        if let Some(w) =  w.upgrade(){
            println!("{}",w.name);
        }
        assert!( w.upgrade().is_some());
    }
    {
        let mut node = Node::new("Node 1".into());
        let mut node2 = Node::new("Node 2".into());
        let rc = Rc::new(node2);
        node.set_value(Rc::clone(&rc));
        drop(rc);// после удаления владеющего указателя, все его Weak указатели так же удалились 
        let w:&Weak<Node> = node.value.as_ref().unwrap();
        assert!( w.upgrade().is_none());
    }
    
}
</code></pre>
