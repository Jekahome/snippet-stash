

```rust
fn register_escape_fn<F>(escape_fn: F, name:&'static str) 
  where F:Fn(&str) -> String,
             F:'static,
             F:Send + Sync 
{
  println!("register_escape_fn: {}", escape_fn(name));
}

fn main(){
    register_escape_fn(|x|{x.to_string()},"closure");

    fn foo(name:&str)-> String{ name.to_string()}
    register_escape_fn(foo,"fn");

    let f:Box<dyn Fn(&str) -> String + Send + Sync> = Box::new(|x:&str|{x.to_string()});
    register_escape_fn(f,"dyn Fn");
}
```
