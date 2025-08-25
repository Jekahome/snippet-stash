`eprintln!`  ошибки правильнее выводить в STDERR 

```
eprintln!("Error: arguments --conf can not be empty !");     

write!(&mut io::stderr(), "{}", "Error: arguments --conf can not be empty !");
```
 
* Чтение и запись в консоль — `stderr()`
```
use std::io::Write; (stderr реализует трейт Write)
(запись)
fn main() -> std::io::Result<()> {
    // eprintln!("{}","error msg");
    std::io::stderr().write_all(b"error msg")?;
   
    let name = "Shoot";
    let r = writeln!(&mut std::io::stderr(), "{}", name);
    r.expect("failed printing to stderr");
    Ok(())
}
```
