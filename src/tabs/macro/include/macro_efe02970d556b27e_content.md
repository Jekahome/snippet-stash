


<pre><code class="language-rust">
macro_rules! foo{
 (valiant_a => $val:ident,$stmt:stmt) => {{
       let $val = $val.clone();
       $stmt // тут в переданном методе отрабатывает $val прошедший через Clone !
 }};
  (valiant_b => $val:ident,$router:ident.$method:ident) => {{
       // необычная компановка вызова
       let $val = $val.clone();
       $router.$method(&$val)
 }};
}
 
 // В один вызов оформил
  macro_rules! no_repeat{
  ($message:expr, [$( $val:expr,$router:ident.$method:ident, )+] ) => {{
     println!("Your message:{}",$message);
     let mut i =0;
       $(
        let res = $router.$method(&$val.clone());
         println!("index:{}, res:{}",{i+=1;i},res);
       )+
 }};
}

 struct B(pub i32);
 impl Clone for B {
 fn clone(&self) -> B {
     B(self.0 + 28)
 }
}
 struct A;
 impl A {
     fn test(param:&B)->i32{ param.0 }
     fn test_self(&self,param:&B)->i32{ param.0 }
 }
fn main(){
  let b = B(22);
  let result =  foo!(valiant_a => b,A::test(&b));
  assert_eq!(50,result);
  
  let b = B(22);
  let result =  foo!(valiant_b => b,A.test_self);
  //assert_eq!(50,result);
  println!("{:?}",result);
  
  no_repeat!("Hello",[
                      B(22),A.test_self,
                      B(0),A.test_self, 
                      B(1),A.test_self,
                     ]
            );
}
</code></pre>
