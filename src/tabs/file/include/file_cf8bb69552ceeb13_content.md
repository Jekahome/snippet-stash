


<pre><code class="language-rust">
// std::fs::read_to_string
fn test()-> Result<(), Box<std::error::Error + 'static>>{
    let s:String = std::fs::read_to_string("file2.txt")?;// Прочтите все содержимое файла в строку
    println!("{}",s);
    Ok(())
}
// trait.Read
fn test2() -> io::Result<()> {
    let mut f = File::open("file2.txt")?;
    let mut buffer = String::new();

    f.read_to_string(&mut buffer)?;
    Ok(())
}
</code></pre>

---

<pre><code class="language-rust">
use std::fs;
use std::io;

fn main() -> io::Result<()> {
    // Чтение всего файла в Vec<u8>
    let bytes = fs::read("example.txt")?;
    println!("Bytes: {:?}", bytes);

    // Чтение файла в строку
    let text = fs::read_to_string("example.txt")?;
    println!("Text: {}", text);

    // Итератор по директории
    for entry in fs::read_dir(".")? {
        let entry = entry?;
        println!("Name: {:?}", entry.file_name());
    }

    // Чтение симлинка
    #[cfg(unix)]
    {
        let target = fs::read_link("symlink.txt")?;
        println!("Symlink points to: {:?}", target);
    }

    Ok(())
}

</code></pre>
