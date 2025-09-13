

```
use std::io::Read;

fn test() -> std::io::Result<()> {
    let mut f = std::fs::File::open("src/foo.txt")?;
    let mut buffer = [0; 10];
    // читать до 10 байт
    f.read(&mut buffer[..])?;
    Ok(())
}

fn test() -> std::io::Result<()> {
    let mut b:&[u8] = "This string will be read".as_bytes(); // &[u8]
    let mut buffer = [0; 10];
    // читать до 10 байт
    b.read(&mut buffer)?;
    // и т. д. ... он работает точно так же, как файл!
    Ok(())
}
```
