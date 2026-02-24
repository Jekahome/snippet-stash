

Mmap::map — unsafe, потому что может привести к undefined behavior, если файл изменяется во время отображения. Но для чтения это безопасно.

Еще есть mmap-rs — более новая и безопасная альтернатива.


```rust
use std::env;
use std::fs::File;
use std::io::{self, Write};
use memmap2::Mmap;

fn main() -> io::Result<()> {
    let args: Vec<String> = env::args().collect();
    if args.len() != 2 {
        eprintln!("Использование: {} <имя_файла>", args[0]);
        std::process::exit(1);
    }

    // Открываем файл
    let file = File::open(&args[1])?;
    
    // Отображаем в память
    let mmap = unsafe { Mmap::map(&file)? };
    
    // Пишем в stdout
    io::stdout().write_all(&mmap[..])?;
    
    // mmap автоматически освободится при выходе из области видимости
    Ok(())
}
```

```toml
[package]
name = "mmapcopy"
version = "0.1.0"
edition = "2021"

[dependencies]
memmap2 = "0.9"
```

