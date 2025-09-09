

```rust
enum Item {
    ChangeColor(i32, i32, i32),
    Move { x: i32, y: i32 },
    Write(String),
}

fn switch(msg:Item){
    match msg {
        Item::ChangeColor(r, g, b) => println!("change_color RGB:{}{}{}",r,g,b),
        Item::Move { x, y} =>  println!("move_cursor x:{} y:{}",x,y),
        Item::Write(s) => println!("{}", s),
        // _ =>  println!("default")
    }
 
   match msg {
        Item::ChangeColor(r, ..) => println!("change_color RGB:{}{}{}",r,g,b),
        Item::Move { .. } =>  println!("move_cursor x:{} y:{}",x,y),
        Item::Write(s) => println!("{}", s),
        // _ =>  println!("default")
  }
}
fn main(){
   let msg_move: Item = Item::Move { x: 3, y: 4 };
   let msg_write: Item  = Item::Write("Hello, world".to_string());
   let msg_color: Item  = Item::ChangeColor(44,1,44);
   switch(msg_move);
   switch(msg_write);
   switch(msg_color);
}
```
