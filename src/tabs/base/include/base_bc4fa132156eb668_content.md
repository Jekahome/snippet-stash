

```rust
// пропущенный
fn print(s: &str){unimplemented!()} ✅ 

// расширенный
fn print2<'a>(s: &'a str){unimplemented!()} ✅ 

// пропущенный
fn trim(s: &str) -> &str{unimplemented!()} ✅ 

// расширенный
fn trim2<'a>(s: &'a str) -> &'a str{unimplemented!()} ✅ 

// недопустимо, невозможно определить время жизни вывода, нет входных данных
fn get_str() -> &str{unimplemented!()} ❌

// явные параметры включают
fn get_str2<'a>() -> &'a str{unimplemented!()} // ✅  generic version
fn get_str3() -> &'static str{unimplemented!()} // ✅  'static version

// недопустимо, невозможно определить время жизни вывода, несколько входов
fn overlap(s: &str, t: &str) -> &str{unimplemented!()} ❌

// явные (но все же частично опущенные) опции включают
fn overlap1<'a>(s: &'a str, t: &str) -> &'a str{unimplemented!()} // ✅  output can't outlive s
fn overlap2<'a>(s: &str, t: &'a str) -> &'a str{unimplemented!()} // ✅  output can't outlive t
fn overlap3<'a>(s: &'a str, t: &'a str) -> &'a str{unimplemented!()} // ✅  output can't outlive s & t
fn overlap4(s: &str, t: &str) -> &'static str{unimplemented!()} // ✅  output can outlive s & t
fn overlap5<'a>(s: &str, t: &str) -> &'a str{unimplemented!()} // ✅  no relationship between input & output lifetimes

// расширенный
fn overlap6<'a, 'b>(s: &'a str, t: &'b str) -> &'a str{unimplemented!()} ✅ 
fn overlap7<'a, 'b>(s: &'a str, t: &'b str) -> &'b str{unimplemented!()} ✅ 
fn overlap8<'a>(s: &'a str, t: &'a str) -> &'a str{unimplemented!()} ✅ 
fn overlap9<'a, 'b>(s: &'a str, t: &'b str) -> &'static str{unimplemented!()} ✅ 
fn overlap10<'a, 'b, 'c>(s: &'a str, t: &'b str) -> &'c str{unimplemented!()} ✅ 

// пропущенный
fn compare(&self, s: &str) -> &str{unimplemented!()} ✅ 

// расширенный
fn compare2<'a, 'b>(&'a self, &'b str) -> &'a str{unimplemented!()} ✅ 
fn main(){}
```

