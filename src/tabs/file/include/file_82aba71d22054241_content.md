

**Пример: читаем строки из `Vec<u8>`**

<pre><code class="language-rust">
use std::io::{self, BufRead, BufReader, Cursor};

fn main() -> io::Result<()> {
    // Буфер в памяти
    let data = b"line1\nline2\nline3\n";
    
    // Cursor превращает &[u8] в поток
    let cursor = Cursor::new(&data[..]);

    // BufReader добавляет построчные методы
    let mut reader = BufReader::new(cursor);

    // Чтение строк
    let mut line = String::new();
    while reader.read_line(&mut line)? > 0 {
        print!("Строка: {}", line);
        line.clear(); // очищаем буфер для следующей строки
    }

    Ok(())
}
</code></pre>
