

```rust
#[derive(Debug,PartialEq)]
enum Test<X>{
    Some(X),
    None
}
impl<X> Test<X> {
    pub fn map<Y, F: FnOnce(X) -> Y>(self, f: F) -> Test<Y> {
        match self {
            Test::Some(x) => Test::Some(f(x)),
            Test::None => Test::None
        }
    }
}
fn main() {
     let t = Test::Some(3);
     let res = t.map(|val:i32| -> i32 { val + 7 });
     assert_eq!(Test::Some(10),res);
     println!("{:?}",res);// 10
}
```
