


<pre><code class="language-rust">
use std::io::{self, BufRead, BufReader, Cursor};

fn main() -> io::Result<()> {
    let data = b"Hello, Rust!\nThis is BufReader.";
    let cursor = Cursor::new(&data[..]);
    let mut reader = BufReader::new(cursor);

    loop {
        // Получаем ссылку на буфер
        let buffer = reader.fill_buf()?;
        if buffer.is_empty() {
            break; // EOF
        }
        // Выводим содержимое буфера как строку
        let text = std::str::from_utf8(buffer).unwrap();
        println!("Буфер: {}", text);

        // Говорим, что весь буфер мы использовали
        let len = buffer.len();
        reader.consume(len);
    }
    Ok(())
}
</code></pre>
