

```rust
fn gen(index:usize)->Option<i32>{
     let data:Vec<Option<i32>> = vec![Some(1),Some(2),Some(3),Some(4),None,Some(6)];  
     if index >= data.len(){
         None
     }else{
        data[index]  
     }
} 
fn main() {    
  let mut current_index = 0;  
  while match gen(current_index) {
     Some(i) => {
       println!("{:?}",i);
       current_index+=1;
       true
     },
     None => {false}
  }{   
      println!("current_index={}",current_index);
  }  
/*
    1
    current_index=1
    2
    current_index=2
    3
    current_index=3
    4
    current_index=4
*/ 
}
```
