


<pre><code class="language-rust">
use std::fs;
use std::io;

fn main() -> io::Result<()> {
    // Запись данных в файл (создаёт/перезаписывает)
    fs::write("example_write.txt", b"Hello, Rust!")?;

    // Установка прав доступа (на Unix)
    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        let perms = fs::Permissions::from_mode(0o644);
        fs::set_permissions("example_write.txt", perms)?;
    }

    Ok(())
}

</code></pre>
