


<pre><code class="language-rust">
use std::path::PathBuf;
pub mod error{
    use std::{io, path::PathBuf};
    use std::process::ExitCode;

    #[derive(thiserror::Error, Debug)]
    pub enum Error {
        #[error("I/O error: {1}, path: {0}")]
        ReadDir(PathBuf, #[source] io::Error),

        #[error("Error of the standard output: {0}")]
        Io(io::Error),
        #[error("File not found: {0}")]
        FileNotFound(PathBuf),
        #[error("Json parse: {0}")]
        RequestClientJsonParse(String),
        #[error("File size exceeded the limit of {0} bytes.")]
        FileSizeExceeded(u64),
        #[error("No data to replace the contents of the file")]
        EmptyContent,
    }
}
// Used:
///
// Для демонстрация ошибки `Error::ReadDir`
// ```
// cargo run -- readdir
// ```
/// По умолчанию при выводе в стандартный поток вывода stdout (println!), работатет отладочный Debug
/// поэтому то что написано в `#[error("I/O error: {1}, path: {0}")]` не будет показано.
/// А просто сработает реализация Debug для типа ошибки "Error: ReadDir("readdir", Custom { kind: Other, error: "your message" })".
/// Что бы сработал форматированный Display надо использовать eprintln! "Error: I/O error: your message, path: readdir"
/// или anyhow::Result
fn main2() -> std::result::Result<(), error::Error> {
    let args: Vec<String> = std::env::args().collect(); 
    if args.len() < 2 {
        return  Err(error::Error::EmptyContent);
        //return Err(std::io::Error::other("args are not found"));
    }
    let arg = args[1].clone();
    let result: Result<(), error::Error> = match arg.as_str() {
        "readdir" =>  Err(error::Error::ReadDir(PathBuf::from(arg),std::io::Error::other("your message"))),
        _ => Err(error::Error::EmptyContent)
    };
    if let Err(e) = result {
        eprintln!("Error: {}", e); // Используем Display
    }
    Ok(())
}
/// Вариант перенаправления ошибки в Display через anyhow::Result
/// этот вариант даже показывет информацию из ` #[source]`
/// ```
/// Error: I/O error: your message, path: readdir
/// 
/// Caused by:
///     your message
/// ```
fn main() -> anyhow::Result<()> {
    let args: Vec<String> = std::env::args().collect(); 
    if args.len() < 2 {
        return  Err(error::Error::EmptyContent.into());
    }
    let arg = args[1].clone();
    let result: anyhow::Result<()> = match arg.as_str() {
        "readdir" =>  Err(error::Error::ReadDir(PathBuf::from(arg),std::io::Error::other("your message")).into()),
        
        _ => Err(error::Error::EmptyContent.into())
    };
    result
}
</code></pre>
