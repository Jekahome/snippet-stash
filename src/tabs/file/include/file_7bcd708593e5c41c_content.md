


<pre><code class="language-rust">
use std::fs::File;
use std::io::{Write, IoSlice};

fn main() -> std::io::Result<()> {
    let mut file = File::create("example_write.txt")?;

    // write
    let bytes_written = file.write(b"Hello, ")?;
    println!("Записано {} байт", bytes_written);

    // by_ref мы можем использовать ссылку так же, как наш исходный буфер
    let reference = file.by_ref();
    reference.write_all(b"some bytes")?;

    // write_all
    file.write_all(b"Rust!")?;

    // flush
    file.flush()?;

    // write_fmt
    file.write_fmt(format_args!("\nNumber: {}", 42))?;

    // write_vectored
    let data = [1; 8];
    let bufs = [IoSlice::new(io_slice), IoSlice::new(b"\nBuf2")];
    file.write_vectored(&bufs)?;

    Ok(())
}

</code></pre>
