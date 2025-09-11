

```rust
use std::cmp::Ordering;
use std::io;

fn main(){
     let mut guest = String::new();
     // guest.push_str("1");
     io::stdin().read_line(&mut guest).expect("Не удалось ввести данные");
     /* постоянный ввод
     loop {
        io::stdin().read_line(&mut guest).expect("Не удалось ввести данные");
        let guest:u32 = match guest.trim().parse(){
          Ok(num) => num,
            Err(_) => continue
        };
     }*/

     let number = "4".to_string();

     match guest.cmp(&number){
        Ordering::Less => print!("меньше"),
        Ordering::Greater => print!("больше"),
        Ordering::Equal => print!("равно")
     }
     let result = 1.cmp(&1);
     assert_eq!(Ordering::Equal, result);
}
```
