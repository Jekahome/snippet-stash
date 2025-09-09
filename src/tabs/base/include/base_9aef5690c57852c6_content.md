

```rust
struct Struct {
   a: i32,
   b: char,
   c: bool,
}
fn main(){
 let mut struct_value = Struct{a: 10, b: 'X', c: false};

 match struct_value {
    Struct{a: 10, b: 'X', c: false} => (),
    Struct{a: 10, b: 'X', ref c} => (),
    Struct{a: 10, b: 'X', ref mut c} => (),
    Struct{a: 10, b: 'X', c: _} => (),
    Struct{a: _, b: _, c: _} => (),
 }
}
```

--- 

```rust
struct Point{
    x:i32,
    y:i32
}
fn main(){
    let point:Point = Point{x:5,y:6};
    match point {
        Point{x:x_,..} => println!("{}",x_)
    }
}
```

--- 

Вы можете связать значение с именем с помощью символа @
```rust
#[derive(Debug)]
struct Person {
    name: Option<String>,
}
fn main(){
    let name = "Steve".to_string();
    let mut x: Option<Person> = Some(Person { name: Some(name) });
    match x {
        Some(Person { name: ref a @ Some(_), .. }) => println!("{:?}", a),
        _ => {}
    }
}
```

