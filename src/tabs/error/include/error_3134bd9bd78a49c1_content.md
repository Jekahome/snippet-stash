

Все типы ошибок должны реализовывать трейт std::error::Error поэтому мы можем возвращать с помощью динамической диспетчеризации `Box<dyn error::Error>`
```rust
use std::io::Read;
fn sum_file(path: &std::path::Path) -> std::result::Result<i32, Box<dyn std::error::Error>> {
    let mut file = std::fs::File::open(path)?; //  std::io::Error -> Box<dyn std::error::Error>
    let mut contents = String::new();
    file.read_to_string(&mut contents)?; //  std::io::Error -> Box<dyn std::error::Error>
    let mut sum = 0;
    for line in contents.lines() {
        sum += line.parse::<i32>()?; // std::num::ParseIntError -> Box<dyn std::error::Error>
    }
    Ok(sum)
}

// Недостаток, это потеря типа возвращаемой ошибки.
// (но если вызывающая сторона знает подробности реализации нашей функции, она все равно может обрабатывать различные типы ошибок, используя метод, downcast_ref())

fn main(){
  match sum_file(path) {
        Ok(sum) => println!("the sum is {}", sum),
        Err(err) => {
            if let Some(e) = err.downcast_ref::<std::io::Error>() {...
            } else if let Some(e) = err.downcast_ref::<std::num::ParseIntError>() {...}
       }
  }
}
```

---
 
```
use std::error::Error;
fn foo() -> Result<(), Box<dyn Error>> {
    std::fs::File::open("not-here")?; // io::Error
    Err("oh noooo!")?;   // &str
    Err("I broke it :<".to_owned())?;  // String
    Err("nop".into())
}
```
