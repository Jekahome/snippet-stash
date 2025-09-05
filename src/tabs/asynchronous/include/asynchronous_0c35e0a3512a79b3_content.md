


<pre><code class="language-rust">
use std::fs::File;
use std::io::{self, Read};
use std::path::Path;
use sha2::{Sha256, Digest};
use tokio::task;

fn calculate_file_hash_sync(file_path: &Path) -> io::Result<String> {
    let mut file = File::open(file_path)?;
    let mut hasher = Sha256::new();
    let mut buffer = Vec::new();

    file.read_to_end(&mut buffer)?;
    hasher.update(buffer);

    let hash_result = hasher.finalize();
    Ok(format!("{:x}", hash_result))
}
async fn calculate_file_hash(file_path: &Path) -> io::Result<String> {
    let path = file_path.to_path_buf();

    // Оборачиваем синхронный код в асинхронный Future
    task::spawn_blocking(move || calculate_file_hash_sync(&path)).await?
}
#[tokio::main]
async fn main() {
    let file_path = std::path::Path::new("example.txt");

    match calculate_file_hash(file_path).await {
        Ok(hash) => println!("Hash of the file: {}", hash),
        Err(e) => eprintln!("Failed to calculate hash: {}", e),
    }
}
</code></pre>
