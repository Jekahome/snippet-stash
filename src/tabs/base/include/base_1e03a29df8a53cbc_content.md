
* Запись в консоль — stdout() 

```
use std::io::Write; (stdout реализует трейт Write)
let b1 = std::io::stdout().write("Tutorials ".as_bytes()).unwrap();
let b2 = std::io::stdout().write(String::from("Point").as_bytes()).unwrap();
std::io::stdout().write(format!("\nbytes written {}",(b1+b2)).as_bytes()).unwrap();
```

* Чтение в файл

```
std::io::stdout().write("Shoot3\n".as_bytes()).unwrap();

$ cargo run > out_stderr.txt
```

```
writeln!(std::io::stdout(), "{}", "hello");
```

* Использование явной синхронизации:

```
use std::io::{self, Write};
fn main() -> io::Result<()> {
    let stdout = io::stdout();
    let mut handle = stdout.lock();
    handle.write_all(b"hello world")?;
    Ok(())
}
```
