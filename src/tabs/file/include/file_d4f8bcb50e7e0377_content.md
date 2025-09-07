


<pre><code class="language-rust">
use std::fs::File;
use std::io::{Read, BufReader};

fn main() -> std::io::Result<()> {
    let file = File::open("example.txt")?;
    let mut reader = BufReader::new(file);

    // read_exact
    let mut buf = [0; 5];
    reader.read_exact(&mut buf)?;
    println!("First 5 bytes: {:?}", buf);

    // read_to_string
    let mut content = String::new();
    reader.read_to_string(&mut content)?;
    println!("Content: {}", content);

    // bytes() iterator
    for byte in "Hi".as_bytes().bytes() {
        println!("Byte: {:?}", byte);
    }

    // take: ограничиваем чтение 10 байт
    let mut limited = reader.take(10);
    let mut small_buf = Vec::new();
    limited.read_to_end(&mut small_buf)?;
    println!("First 10 bytes after position: {:?}", small_buf);

    Ok(())
}
</code></pre>
