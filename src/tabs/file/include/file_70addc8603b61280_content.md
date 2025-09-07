


<pre><code class="language-rust">
use std::fs::OpenOptions;
use std::io::{Write, Read};

fn main() -> std::io::Result<()> {
    // 1. Запишем в новый файл (создание + запись + truncate)
    let mut file = OpenOptions::new()
        .write(true)
        .create(true)
        .truncate(true)
        .open("example.txt")?;
    writeln!(file, "Hello, Rust!")?;

    // 2. Добавим в конец (append)
    let mut file = OpenOptions::new()
        .append(true)
        .open("example.txt")?;
    writeln!(file, "New line!")?;

    // 3. Прочитаем файл
    let mut file = OpenOptions::new()
        .read(true)
        .open("example.txt")?;
    let mut content = String::new();
    file.read_to_string(&mut content)?;
    println!("Содержимое:\n{}", content);

    Ok(())
}

</code></pre>
