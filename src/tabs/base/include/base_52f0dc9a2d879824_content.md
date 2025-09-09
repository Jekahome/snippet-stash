

**Вывод/печать ошибок в стандартный поток ошибок STDERR через eprintln!**
```rust
fn main(){
   eprintln!("Error: arguments --conf can not be empty !");     
  
   write!(&mut io::stderr(), "{}", "Error: arguments --conf can not be empty !");

   process::exit(1);
}
```


**Запись в консоль — `stderr()`**
```rust
use std::io::Write; (stderr реализует трейт Write)

fn main() -> std::io::Result<()> {
    // eprintln!("{}","error msg");
    std::io::stderr().write_all(b"error msg")?;
   
    let name = "Shoot";
    let r = writeln!(&mut std::io::stderr(), "{}", name);
    r.expect("failed printing to stderr");
    Ok(())
}
```
