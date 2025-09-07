


<pre><code class="language-rust">
use std::fs;
use std::io;

fn main() -> io::Result<()> {
    // Создаёт одну директорию
    fs::create_dir("dir1")?;

    // Создаёт все необходимые родительские директории
    fs::create_dir_all("dir2/subdir")?;
    
    Ok(())
}

</code></pre>
