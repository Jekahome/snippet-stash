

```rust
#![feature(get_mut_unchecked)]
#[derive(Debug)]     
struct Person(String);
impl Person{
    fn show(&self){
        println!("{}",self.0);
    }
    fn get_key(&self)->&str{
        self.0.as_str()
    }
    fn set_key(&mut self,key:&str){
        self.0=key.to_owned();
    }
}

fn main(){
    let mut r:Rc<Person> = Rc::new(Person("hello".to_string()));
    {
        // Доступ к данным.Для Rc работает Deref поэтому можно обращаться к данным на прямую
        r.show();
        // для мутации данных находящихся за Rc используется Rc::get_mut или Rc::get_mut_unchecked в unsafe с #![feature(get_mut_unchecked)] и `cargo +nightly`
        if Rc::strong_count(&r)==1 && Rc::weak_count(&r)==0 {
            if let Some(person_mut) = Rc::get_mut(&mut r){
                person_mut.set_key("new key");
            } 
        }
        let key:&str = r.get_key();
        assert_eq!("new key",key);     
    }

    {
        // Доступ к данным.Для Weak нужно распаковывать через as_ptr или into_raw в Rc
        let weak:Weak<Person> = Rc::downgrade(&r);
        let p:&Person = unsafe { &*weak.as_ptr() };
        p.show();
        // Для изменения данных находящихся за Weak следует перевести weak обратно в Rc и использовать Rc::get_mut_unchecked в unsafe  с #![feature(get_mut_unchecked)] и `cargo +nightly`
        if let Some(ref mut r_mut) = weak.upgrade(){ 
            unsafe {
                let person_mut:&mut Person = Rc::get_mut_unchecked(r_mut);
                person_mut.set_key("new key 2");
            }   
        }
        let key:&str = p.get_key();
        assert_eq!("new key 2",key); 
    }
}
```
