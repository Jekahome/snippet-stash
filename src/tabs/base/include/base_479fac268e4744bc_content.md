

```rust
fn foo(name:&str)-> String{ name.to_string()}

fn register_escape_fn<F: 'static + Fn(&str) -> String + Send + Sync>( escape_fn: F, name:&'static str ){
  println!("register_escape_fn: {}", escape_fn(name));
  println!("register_escape_fn: {}", escape_fn(name));
}

fn register_escape_fnonce<F: 'static + FnOnce(&str) -> String + Send + Sync>( escape_fn: F, name:&'static str ){
  println!("register_escape_fnonce: {}", escape_fn(name));
  // println!("register_escape_fnonce: {}", escape_fn(name));//  use of moved value: `escape_fn`
}

fn register_escape_fnmut<F: 'static + FnMut(i32) -> i32 + Send + Sync>( mut escape_fn: F, value:i32 ){
  println!("register_escape_fnmut: {}", escape_fn(value));
}
fn main(){
 let value:&str="hi";
 register_escape_fn(|x|{x.to_string()},value);
 register_escape_fn(foo,value);

 register_escape_fnonce(|x|{x.to_string()},value);
 register_escape_fnonce(foo,value);

 let mut value:i32=0;
 register_escape_fnmut(|mut x|{ x += 2;x },value);
}
```
