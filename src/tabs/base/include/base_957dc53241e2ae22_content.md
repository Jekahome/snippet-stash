 

* Чтение с консоли — stdin()
```
   use std::io::Write;
   let mut line = String::new();
   println!("Enter your name :");
   let b1 = std::io::stdin().read_line(&mut line).unwrap();
   println!("Hello , {}", line);
   println!("no of bytes read , {}", b1);
```

* Запись в консоль — stdout() 
```
    use std::io::Write; // (stdout реализует трейт Write)
    let b1 = std::io::stdout().write("Tutorials ".as_bytes()).unwrap();
    let b2 = std::io::stdout().write(String::from("Point").as_bytes()).unwrap();
    std::io::stdout().write(format!("\nbytes written {}",(b1+b2)).as_bytes()).unwrap();
```

* Чтение и запись в консоль — stderr()
```
use std::io::Write; // (stderr реализует трейт Write)
(запись)
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

  // (чтение в файл)
   std::io::stdout().write("Shoot3\n".as_bytes()).unwrap();
```

```
$ cargo run > out_stderr.txt

Using explicit synchronization:
use std::io::{self, Write};
fn main() -> io::Result<()> {
    let stdout = io::stdout();
    let mut handle = stdout.lock();
    handle.write_all(b"hello world")?;
    Ok(())
}
```
