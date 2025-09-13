

```
// Этот вариант не сможем протестировать, нет доступа к выводу
fn find_matches(content: &str, pattern: &str) {
    for line in content.lines() {
        if line.contains(pattern) { println!("{}", line); }
    }
}
// Этот вариант мы можем протестировать
fn find_matches(content: &str, pattern: &str, mut writer: impl std::io::Write) {
    for line in content.lines() {
        if line.contains(pattern) { writeln!(writer, "{}", line); }
    }
}
#[test]
fn find_a_match() {
    let mut result = Vec::new();
    find_matches("lorem ipsum\ndolor sit amet", "lorem", &mut result);
    assert_eq!(result, b"lorem ipsum\n");
}
fn main() -> Result<()> {
    let args = Cli::parse();
    let content = std::fs::read_to_string(&args.path).with_context(|| format!("could not read file `{}`", args.path.display()))?;
    find_matches(&content, &args.pattern, &mut std::io::stdout());
    Ok(())
}
```

---

```
use std::io::{BufWriter, Write};
#[test]
fn test_stdout() {
    let stdout = std::io::stdout();
    let mut writer = BufWriter::new(stdout.lock());
    your_function(&mut writer);
    let output = writer.buffer();
    assert_eq!(output, b"Expected output");
}
```
