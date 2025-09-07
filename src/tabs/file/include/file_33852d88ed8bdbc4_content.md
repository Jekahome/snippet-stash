


<pre><code class="language-rust">
use std::path::Path;
use std::fs;

fn main() -> std::io::Result<()> {
    let path = Path::new("/tmp/example.txt");

    // Проверка существования и типа
    println!("exists: {}", path.exists());
    println!("is_file: {}", path.is_file());
    println!("is_dir: {}", path.is_dir());

    // Разбор компонентов
    println!("file_name: {:?}", path.file_name());       // "example.txt"
    println!("extension: {:?}", path.extension());       // "txt"
    println!("file_stem: {:?}", path.file_stem());       // "example"
    println!("parent: {:?}", path.parent());             // "/tmp"

    // Манипуляции
    let new = path.with_extension("log");
    println!("with_extension: {:?}", new);               // "/tmp/example.log"

    let joined = Path::new("/tmp").join("nested/file.rs");
    println!("join: {:?}", joined);                      // "/tmp/nested/file.rs"

    // Метаданные
    if let Ok(metadata) = fs::metadata(path) {
        println!("file size: {} bytes", metadata.len());
    }

    Ok(())
}
</code></pre>
