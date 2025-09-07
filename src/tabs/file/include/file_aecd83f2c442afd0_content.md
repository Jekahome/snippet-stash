


<pre><code class="language-rust">
use std::io::{self, Read};

fn main() -> io::Result<()> {
    let data = b"Hello, world!";
    let mut reader = &data[..]; // &[u8] реализует Read

    // Читаем только часть через by_ref + take
    let mut limited = String::new();
    reader.by_ref().take(5).read_to_string(&mut limited)?;
    println!("Ограниченное чтение: {}", limited); // "Hello"

    // Теперь можно продолжить читать из того же reader
    let mut rest = String::new();
    reader.read_to_string(&mut rest)?;
    println!("Остальное: {}", rest); // ", world!"

    Ok(())
}

</code></pre>

---

<pre><code class="language-rust">
fn main() -> io::Result<()> {
    let mut f = File::open("foo.txt")?;
    let mut buffer = Vec::new();
    let mut other_buffer = Vec::new();
    {
        let reference = f.by_ref();
        // read at most 5 bytes
        reference.take(5).read_to_end(&mut buffer)?;
    } // drop our &mut reference so we can use f again
    // original file still usable, read the rest
    f.read_to_end(&mut other_buffer)?;
    Ok(())
}
</code></pre>
