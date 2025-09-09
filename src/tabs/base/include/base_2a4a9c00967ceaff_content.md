

Если у вас есть многократные вызовы этих макросов, возможно, лучше заблокировать стандартный вывод вручную.

Например, измените этот код:

```rust
fn main(){
    for line in lines {
        println!("{}", line);
    }
}
```

на этот:
```rust
use std::io::Write;
fn main(){
    let mut stdout = std::io::stdout();
    let mut lock = stdout.lock();
    for line in lines {
        writeln!(lock, "{}", line)?;
    }
    // stdout разблокируется при сбросе `lock`
}
```
