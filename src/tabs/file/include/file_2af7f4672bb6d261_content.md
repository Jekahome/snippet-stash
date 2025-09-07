


<pre><code class="language-rust">
use std::fs::File;
use std::io::{Seek, SeekFrom, Read};

fn main() -> std::io::Result<()> {
    let mut file = File::open("example_seek.txt")?;

    // Перейти на 5 байт от начала
    let pos = file.seek(SeekFrom::Start(5))?;
    println!("Current position: {}", pos);

    // Перейти на 2 байта вперёд от текущей позиции
    let pos = file.seek(SeekFrom::Current(2))?;
    println!("Current position: {}", pos);

    // Перейти на 3 байта назад от конца файла
    let pos = file.seek(SeekFrom::End(-3))?;
    println!("Current position: {}", pos);

    Ok(())
}
</code></pre>
