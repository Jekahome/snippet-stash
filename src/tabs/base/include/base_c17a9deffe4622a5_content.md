


<pre><code class="language-rust">
use std::io::{self, Read};
use std::num;

enum CliError {
    IoError(io::Error),
    ParseError(num::ParseIntError),
}
impl From<io::Error> for CliError {
    fn from(error: io::Error) -> Self {
        CliError::IoError(error)
    }
}
impl From<num::ParseIntError> for CliError {
    fn from(error: num::ParseIntError) -> Self {
        CliError::ParseError(error)
    }
}
fn open_and_parse_file(file_name: &str) -> Result<i32, CliError> {
    let mut file = std::fs::File::open("test")?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    let num: i32 = contents.trim().parse()?;
    Ok(num)
}
</code></pre>
