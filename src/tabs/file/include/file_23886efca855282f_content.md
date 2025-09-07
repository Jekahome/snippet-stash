


<pre><code class="language-rust">
use std::fs::File;
use std::io::{Seek, SeekFrom, Write, Read};

fn main() -> std::io::Result<()> {
    let mut file = File::create("example_seek.txt")?;
    file.write_all(b"Hello, Rust!")?;

    // Перемещаемся в начало
    file.rewind()?;

    // Читаем первые 5 байт
    let mut buffer = [0; 5];
    file.read_exact(&mut buffer)?;
    println!("Read: {:?}", std::str::from_utf8(&buffer).unwrap());

    // Сместить на 2 байта вперёд относительно текущей позиции
    file.seek_relative(2)?;

    // Позиция сейчас
    println!("Current position: {}", file.stream_position()?);

    // Общая длина файла
    println!("Stream length: {}", file.stream_len()?);

    Ok(())
}

</code></pre>
