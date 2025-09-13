

```rust
fn main(){
    let s = Some("xyz".to_string());
    let foo = make_foo(&s);
    println!("{:?}", foo());
 //или unstable
    use std::boxed::FnBox;
    let s = Some("xyz".to_string());
    let foo = Box::new(|| s) as Box<FnBox() -> Option<String>>;
    println!("{:?}", foo());
}
fn make_foo<'a>(s: &'a Option<String>) -> Box<Fn() -> Option<&'a str> + 'a> {
    Box::new(move || s.as_ref().map(|s| &**s)) as Box<Fn() -> Option<&'a str> + 'a>
}
```
