


```rust
pub fn just_print_stringy(v: &str) {
    println!("{}", v)
}
pub fn add_hi(v: &mut String) {
    v.push_str(" Hi")
}
pub struct Nickname(String);
impl Nickname {
    pub fn new(nickname: String) -> Self {
        Self(nickname)
    }
}
fn main(){}
```

---
Однако из-за необходимости явного преобразования типов в Rust такой API может быть недостаточно эргономичным
```rust
fn main(){
   let mut nickname = Nickname::new("Vasya".to_string());
   add_hi(nickname.as_mut());
   just_print_stringy(nickname.as_ref());
}
```

---

Самый стандартный способ улучшить эргономику здесь - скрыть преобразования типов под капотом, абстрагируясь от типов ввода в наших API:
```rust
use std::convert::{AsRef,AsMut};
pub struct Nickname(String);

impl AsRef< str> for Nickname {
    fn as_ref(&self) -> &str {
        &self.0
    }
}
impl AsMut< String> for Nickname {
    fn as_mut(&mut self) -> &mut String {
        &mut self.0
    }
}
impl Nickname { 
    pub fn new< S: Into< String>>(nickname: S) -> Self {
        Self(nickname.into())
    }
}
pub fn just_print_stringy< S: AsRef< str>>(v: S) {
    println!("{}", v.as_ref())
}

pub fn add_hi< S: AsMut< String>>(mut v: S) {
    v.as_mut().push_str(" Hi")
}
fn main(){}
```

---

И теперь нашим API приятно пользоваться:
```
let mut nickname = Nickname::new("Vasya");
add_hi(&mut nickname);
just_print_stringy(&nickname);
```

---

Или через Cow
```rust
pub struct Nickname2< 'a>(Cow< 'a, str>);
impl< 'a> Nickname2< 'a> {
    pub fn new< S>(raw: S) -> Nickname2< 'a>
        where S: Into< Cow< 'a, str>>
    {
        Nickname2( raw.into() )
    }
}
impl < 'a>AsRef< str> for Nickname2< 'a> {
    fn as_ref(&self) -> &str {
        &self.0
    }
}
impl < 'a>AsMut< String> for Nickname2< 'a> {
    fn as_mut(&mut self) -> &mut String {
        self.0.to_mut()
    }
}

pub struct Nickname3(Cow< 'static, str>);
impl Nickname3 {
    pub fn new< S>(raw: S) -> Nickname3
        where S: Into< Cow< 'static, str>>
    {
        Nickname3( raw.into() )
    }
}
impl AsRef< str> for Nickname3 {
    fn as_ref(&self) -> &str {
        &self.0
    }
}
impl AsMut< String> for Nickname3 {
    fn as_mut(&mut self) -> &mut String {
        self.0.to_mut()
    }
}
fn main() {
   let mut nickname = Nickname2::new("Vasya");
   add_hi(&mut nickname);
   just_print_stringy(&nickname);
   
   let mut nickname = Nickname3::new("Vasya");
   add_hi(&mut nickname);
   just_print_stringy(&nickname);
}
```
