

```rust
mod controller{  
    fn my_private(v:i32)->bool{
        true
    }

  #[cfg(test)]
   pub mod ex{
    use super::*;
        pub fn extend_visible()->Box<dyn Fn(i32)->bool +Send + Sync>{
            Box::new(super::my_private)  
        }
    }
}

#[cfg(test)]
pub mod engine{
use super::controller::ex::extend_visible;
    #[test]
    pub fn test_private_method(){
       let func_private = extend_visible();
       assert!(func_private(2));
    }
}


// вариант 2 с обьектом
// Выполнение метода теста в контекте видимости приватного метода 
// необходимо динамически определить принадлежность метода в процесе выполнения
mod controller2{
    pub struct A{
        pub data:i32
    }
    impl A{
        fn private(&self)->i32{
          self.data
        }
    }
    pub fn extend_obj<F: 'static + Fn(Box<dyn Fn(&A)->i32 + Send + Sync>) + Send + Sync>(f:F){     
        f(Box::new(A::private));
    }
    fn private()->i32 {       
      88
    }
    pub fn extend<F: 'static + Fn(Box<dyn Fn()->i32 + Send + Sync>) + Send + Sync>(f:F){
        f(Box::new(self::private));
    }
}

#[cfg(test)]
mod engine2 {
use super::*;
    #[test]
    fn test_private_obj() {
        fn inj(func_private:Box<dyn Fn(&controller2::A)->i32 + Send + Sync>){
          let a = controller2::A{data:88};
          let res = func_private(&a); 
          assert_eq!(88,res);
        }   
        controller3::extend_obj(inj);
    }   
     #[test]
    fn test_private() {
        fn inj(f:Box<dyn Fn()->i32 + Send + Sync>){
          let res = f();
          assert_eq!(88,res);
        }
        controller2::extend(inj);
    }
}
```

