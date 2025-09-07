


<pre><code class="language-rust">
use std::fs;
use std::io;

fn main() -> io::Result<()> {
    // Создание жёсткой ссылки
    fs::hard_link("example.txt", "example_hardlink.txt")?;

    #[cfg(unix)]
    {
        // Чтение симлинка (уже показано выше)
        let target = fs::read_link("example_symlink.txt")?;
        println!("Symlink points to: {:?}", target);
    }

    Ok(())
}

</code></pre>
