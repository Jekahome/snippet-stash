


<pre><code class="language-rust">
use std::fs;

fn main() -> std::io::Result<()> {
    for entry in fs::read_dir(".")? {
        let entry = entry?;                // DirEntry
        let path = entry.path();           // полный путь
        let name = entry.file_name();      // имя файла
        let ftype = entry.file_type()?;    // тип

        println!("Имя: {:?}", name);
        println!("Путь: {:?}", path);

        if ftype.is_dir() {
            println!("  -> это директория");
        } else if ftype.is_file() {
            println!("  -> это файл");
        } else if ftype.is_symlink() {
            println!("  -> это символическая ссылка");
        }
        if let Ok(metadata) = entry.metadata() {
            // Now let's show our entry's permissions!
            println!("{:?}: {:?}", entry.path(), metadata.permissions());
        } else {
            println!("Couldn't get metadata for {:?}", entry.path());
        }
        println!();
    }
    Ok(())
}
</code></pre>
