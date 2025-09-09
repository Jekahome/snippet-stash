

**Чтение с консоли — stdin()**
```rust
use std::io::Write;
fn main(){
   let mut line = String::new();
   println!("Enter your name :");
   let b1 = std::io::stdin().read_line(&mut line).unwrap();
   println!("Hello , {}", line);
   println!("no of bytes read , {}", b1);
}
```
 

**Запись в консоль — stdout()**
```rust
use std::io::Write; // (stdout реализует трейт Write)
fn main(){
    let b1 = std::io::stdout().write("Tutorials ".as_bytes()).unwrap();
    let b2 = std::io::stdout().write(String::from("Point").as_bytes()).unwrap();
    std::io::stdout().write(format!("\nbytes written {}",(b1+b2)).as_bytes()).unwrap();
}
```
 

**Запись в консоль — stderr()**
```rust
use std::io::Write; // (stderr реализует трейт Write)
fn main() -> std::io::Result<()> {
    //   eprintln!("{}","error msg");
    std::io::stderr().write_all(b"error msg")?;
   /*
    let name = "Shoot";
    let r = writeln!(&mut std::io::stderr(), "{}", name);
    r.expect("failed printing to stderr");
   */
    Ok(())
}
```


**Чтение std::io::stdout в файл**
```rust
fn main(){
    std::io::stdout().write("Shoot3\n".as_bytes()).unwrap();
}
```
   
Запуск:
```
$ cargo run > out_stderr.txt
```

**Использование явной синхронизации:**
```rust>
use std::io::{self, Write};
fn main() -> io::Result<()> {
    let stdout = io::stdout();
    let mut handle = stdout.lock();
    handle.write_all(b"hello world")?;
    Ok(())
}
```


