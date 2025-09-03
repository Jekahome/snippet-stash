


<pre><code class="language-rust">
use std::cell::RefCell;
use std::cell::{Ref,RefMut};
fn main(){
    let c = RefCell::new(5_i32);
    {
        let m:RefMut<'_, i32> = c.borrow_mut();
        assert!(c.try_borrow().is_err());
    }

    {
        let m:Ref<'_, i32> = c.borrow();
        assert!(c.try_borrow().is_ok());
    }
}
</code></pre>

---

<pre><code class="language-rust">
fn main(){
    let mut nodes: HashMap<String,Rc<RefCell<Node>>> = HashMap::new();
    let node_new:Rc<RefCell<Node>> = Rc::new(RefCell::new(node));
    nodes.insert("key".to_string(), node_new);

    pub fn search(&self,key:&str)->Option<&Node>{
        if let Some(node_rc) = self.nodes.get(key){ 
            if let Ok(node_ref) = node_rc.try_borrow(){// impl RefCell fn try_borrow() 
                return Some(std::cell::Ref::leak(node_ref));
            }
        }
        None
    }
}
</code></pre>
