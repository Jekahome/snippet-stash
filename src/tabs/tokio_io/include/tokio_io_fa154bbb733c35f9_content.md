

При традиционном блокировании ввода-вывода приложение останавливается, ожидая завершения каждой операции ввода-вывода, прежде чем продолжить работу. Это может привести к проблемам с производительностью и ограничить масштабируемость приложения. Чтобы решить эти проблемы, мы обратимся к асинхронному вводу-выводу.
<pre><code class="language-rust">
use tokio::io::{self, BufWriter, AsyncWriteExt};
use tokio::fs::File;

#[tokio::main]
async fn main() -> io::Result<()> {
    let f = File::create("foo.txt").await?;
    {
        let mut writer = BufWriter::new(f);
        // Записать байт в буфер
        writer.write(&[42u8]).await?;
        // Очистить буфер до того, как он выйдет за пределы области действия.
        writer.flush().await?;
    } // Если он не очищен или не выключен, содержимое буфера удаляется при drop
    Ok(())
}
use tokio::io::{BufReader, AsyncBufReadExt};
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
</code></pre>
