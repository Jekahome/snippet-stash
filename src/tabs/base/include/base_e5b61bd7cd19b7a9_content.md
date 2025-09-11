

```rust
use std::str::FromStr;
use std::num::ParseIntError;

#[derive(Debug, Serialize, Deserialize, PartialEq)]
enum ErrorLevel2{
    DEBUG,INFO,WARN,ERROR,PANIC,EMPTY
}
impl FromStr for ErrorLevel2 {
    type Err = ParseIntError;
    fn from_str(s: &str) -> Result<Self, Self::Err> {
          match s{
           "debug" => Ok(ErrorLevel2::DEBUG ),
              "" => Ok(ErrorLevel2::EMPTY ),
              _ => Ok(ErrorLevel2::PANIC )
          }
    }
}
fn main(){
    let p:ErrorLevel2 = ErrorLevel2::from_str("debug").unwrap();
    print!("{:?}",p);
    assert_eq!(ErrorLevel2::DEBUG ,p);
}
```
