


<pre><code class="language-rust">
#![feature(get_mut_unchecked)]
use std::rc::{Rc,Weak};

    #[derive(Debug)] 
    struct Test(String);
    impl Test{
        fn set_value(&mut self,value:String){
            self.0 = value;
        }
    }
fn main(){
    let test = Test("hello".to_string());
    // New Strong count
    let mut test_rc:Rc<Test> = Rc::new(test);
    assert_eq!(1,Rc::strong_count(&test_rc));// ++
    assert_eq!(0,Rc::weak_count(&test_rc));
    // изменение данных
    if Rc::strong_count(&test_rc)==1 && Rc::weak_count(&test_rc)==0 {
        if let Some(test) = Rc::get_mut(&mut test_rc){
            test.set_value("gfg".to_string());
            println!("{:?}",test_rc);
        } 
    }
 
    // Add Strong count
    let test_rc_2:Rc<Test> = Rc::clone(&test_rc);
    assert_eq!(2,Rc::strong_count(&test_rc));// ++
    assert_eq!(0,Rc::weak_count(&test_rc));
    
    // Add Weak count
    let mut test_weak:Weak<Test> = Rc::downgrade(&test_rc);
    assert_eq!(2,Weak::strong_count(&test_weak));// это из-за Rc
    assert_eq!(1,Weak::weak_count(&test_weak));// ++
        
    // Получение не изменяемого указателя *const T 
    {
        let ptr:*const Test = test_weak.as_ptr();
        let test:&Test = unsafe { &*ptr };
        assert_eq!(test.0,"gfg".to_string());        
    }
    // Получение не изменяемого указателя *const T 
    {   
        let raw:*const Test = test_weak.into_raw();
        let test:&Test = unsafe { &*raw };
        assert_eq!(test.0,"gfg".to_string());
        assert_eq!(1,Rc::weak_count(&test_rc)); // по прежнему 1 weak count
        test_weak = unsafe { Weak::from_raw(raw)};// восстановление 
        assert_eq!(1,Rc::weak_count(&test_rc)); // по прежнему 1 weak count
    }
    // Изменение данных
    let test_rc_3: Option<Rc<Test>> = test_weak.upgrade();
    if let Some(ref mut test_rc_3) = test_weak.upgrade(){
        unsafe {
            let test:&mut Test = Rc::get_mut_unchecked(test_rc_3);
            test.set_value("gfg".to_string());
        }   
    }
    
    assert_eq!(3,Rc::strong_count(&test_rc));// ++
    drop(test_rc_3);
    assert_eq!(2,Rc::strong_count(&test_rc));// --

    std::mem::drop(test_rc);// или std::mem::drop(test_rc_2);
    assert_eq!(1,Rc::strong_count(&test_rc_2));// --
    assert_eq!(1,Rc::weak_count(&test_rc_2));
  
    // Add Strong count (через weak достать rc)
    let test_rc_3: Rc<Test> = test_weak.upgrade().expect("при условии Rc count > 0"); 
    println!("Weak strong_count={} weak_count={}",Weak::strong_count(&test_weak),Weak::weak_count(&test_weak));
    assert_eq!(2,Weak::strong_count(&test_weak));// ++
    assert_eq!(1,Weak::weak_count(&test_weak));
    println!("Rc strong_count={} weak_count={}",Rc::strong_count(&test_rc_3),Rc::weak_count(&test_rc_3));

    // После удаление последнего strong pointer все weak pointer удаляются 
    std::mem::drop(test_rc_2); 
    std::mem::drop(test_rc_3);
    println!("Weak strong_count={} weak_count={}",Weak::strong_count(&test_weak),Weak::weak_count(&test_weak));
    assert_eq!(0,Weak::strong_count(&test_weak));// --
    assert_eq!(0,Weak::weak_count(&test_weak));// --
}
</code></pre>
