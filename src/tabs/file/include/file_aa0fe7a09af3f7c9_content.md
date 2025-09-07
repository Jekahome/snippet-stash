


<pre><code class="language-rust">
use std::fs;
use std::io;

fn main() -> io::Result<()> {
    fs::remove_file("example_write.txt")?;      // удалить файл
    fs::remove_dir("dir1")?;                    // удалить пустую директорию
    fs::remove_dir_all("dir2")?;                // удалить директорию рекурсивно
    Ok(())
}

</code></pre>
