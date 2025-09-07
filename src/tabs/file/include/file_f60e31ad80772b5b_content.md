

Встроенный тип String использует UTF-8 внутри, что добавляет небольшие, но ненулевые накладные расходы, вызванные проверкой UTF-8, когда вы читаете вводимые в него данные. Если вы просто хотите обрабатывать входные байты, не беспокоясь о UTF-8 (например, если вы обрабатываете текст ASCII), вы можете использовать BufRead::read_until.

Существуют также специальные ящики linereader для чтения байтовых строк данных и работы с байтовыми строками bstr.
<pre><code class="language-rust">
extern crate linereader;
use linereader::LineReader;
fn main(){
    let mut file = File::open(myfile).expect("open");

    // Defaults to a 64 KiB buffer and b'\n' delimiter; change with one of:
    //  * LineReader::with_capacity(usize);
    //  * LineReader::with_delimiter(u8);
    //  * LineReader::with_delimiter_and_capacity(u8, usize)
    let mut reader = LineReader::new(file);

    while let Some(line) = reader.next_line() {
        let line = line.expect("read error");
        // line is a &[u8] owned by reader.
    }
}
</code></pre>

---

<pre><code class="language-rust">
use std::error::Error;
use std::io::{self, Write};

use bstr::{ByteSlice, io::BufReadExt};

fn main() -> Result<(), Box<dyn Error>> {
    let stdin = io::stdin();
    let mut stdout = io::BufWriter::new(io::stdout());

    stdin.lock().for_byte_line_with_terminator(|line| {
        if line.contains_str("Dimension") {
            stdout.write_all(line)?;
        }
        Ok(true)
    })?;
    Ok(())
}
</code></pre>
