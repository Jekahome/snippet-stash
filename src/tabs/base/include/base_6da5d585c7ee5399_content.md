


```rust
use derive_more::{AsRef, AsMut};

pub fn just_print_stringy<S: AsRef<String>>(v: S) {
    println!("{}", v.as_ref())
}

pub fn add_hi<S: AsMut<String>>(mut v: S) {
    v.as_mut().push_str(" Hi")
}

#[derive(AsMut, AsRef)]
pub struct Nickname(String);

impl Nickname {
    pub fn new<S: Into<String>>(nickname: S) -> Self {
        Self(nickname.into())
    }
}
fn main(){
   let mut nickname = Nickname::new("Vasya");
   add_hi(&mut nickname);
   just_print_stringy(&nickname);
}
```
