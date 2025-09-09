

```rust
fn main() {
    use std::io::{self, stdin, stdout, Write};
    let mut str_numbers = String::new();
    io::stdin().read_line(&mut str_numbers );
    let mut iterator = str_numbers.split(" ");
    let n1: &i32 = &iterator.next().unwrap_or("0").trim().parse::<i32>().unwrap_or(0);
    let n2: &i32 = &iterator.next().unwrap_or("0").trim().parse::<i32>().unwrap_or(0);
  /* let mut buffer = String::new();
   {
        use std::fmt::Write;
        write!(buffer, "{}", n1 + n2);
    } */   
    let  buffer  = format!("{}",format_args!("{}",n1 + n2));
    let stdout = io::stdout();
    let mut handle = stdout.lock();
    handle.write(buffer.as_bytes());
}
```

Можно проще:

```
use std::io::Write;
writeln!(std::io::stdout(), "{}", "hello");
```
