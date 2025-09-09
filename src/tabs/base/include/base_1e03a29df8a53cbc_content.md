

**Запись в консоль — stdout()**
```rust
use std::io::Write; // (stdout реализует трейт Write)
fn main(){
    let b1 = std::io::stdout().write("Tutorials ".as_bytes()).unwrap();
    let b2 = std::io::stdout().write(String::from("Point").as_bytes()).unwrap();
    std::io::stdout().write(format!("\nbytes written {}",(b1+b2)).as_bytes()).unwrap();

   writeln!(std::io::stdout(), "{}", "hello");
}
```
 

**Чтение в файл**
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
```rust
use std::io::{self, Write};
fn main() -> io::Result<()> {
    let stdout = io::stdout();
    let mut handle = stdout.lock();
    handle.write_all(b"hello world")?;
    Ok(())
}
```

