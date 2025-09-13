

Trait tokio::io::[AsyncRead](https://docs.rs/tokio/latest/tokio/io/trait.AsyncRead.html), tokio::io::[AsyncWrite](https://docs.rs/tokio/latest/tokio/io/trait.AsyncWrite.html) - эти две черты предоставляют возможности для асинхронного чтения и записи в байтовые потоки.
Методы этих признаков обычно не вызываются напрямую, вместо этого вы будете использовать их с помощью AsyncReadExt, AsyncWriteExt

При традиционном блокировании ввода-вывода приложение останавливается, ожидая завершения каждой операции ввода-вывода, прежде чем продолжить работу. 

Это может привести к проблемам с производительностью и ограничить масштабируемость приложения. Чтобы решить эти проблемы, мы обратимся к асинхронному вводу-выводу.

**Write**
```rust
use tokio::io::{self, BufWriter, AsyncWriteExt};
use tokio::fs::File;

#[tokio::main]
async fn main() -> io::Result<()> {
    let f = File::create(""foo.txt"").await?;
    {
        let mut writer = BufWriter::new(f);
        // Записать байт в буфер
        writer.write(&[42u8]).await?;
        // Очистить буфер до того, как он выйдет за пределы области действия.
        writer.flush().await?;
    } // Если он не очищен или не выключен, содержимое буфера удаляется при drop
    Ok(())
}   
```

**Read**
```rust
use tokio::io::{BufReader, AsyncBufReadExt};
use tokio::fs::File;

#[tokio::main]
async fn main() -> io::Result<()> {
    let f = File::open("foo.txt").await?;
    let mut reader = BufReader::new(f);
    let mut buffer = String::new();
    // Read a line into the buffer
    reader.read_line(&mut buffer).await?;
    println!("{}", buffer);
    Ok(())
}                                                                                                                                                                                        
```
