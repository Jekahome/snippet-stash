


```rust
pub struct Node<T> {
   pub data: T, 
}
impl <T>Node<T> {
    fn new(data:T) -> Self {
      Node {data }    
    }
}
impl <String> Node<String> {
    pub fn new_string(data: String) -> Self {
        Node { data: data.into() }
    }
}
fn main(){
   let node = Node::<i32>::new(123);
   let node = Node::<String>::new_string("Hello".into());
}
```

---- 
 
```rust
struct Generic<T,V> { data: T,val:V }

impl<T,V> Generic<T,V> {
     fn new(data: T,val:V)-> Generic<T,V> {
            //let res = data + val;// Ошибка у типов T,V нереализована операция +
            Generic { data: data,val: val}
     }
}
fn main(){
   let thing1 = Generic::new(0u32,1);
   let thing2 = Generic::new(8i32,1);
   let thing3 = Generic::new(3,5.5);
   println!("{}", thing3.val);
}
```
