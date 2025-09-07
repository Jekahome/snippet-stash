


<pre><code class="language-rust">
fn main() -> io::Result<()> {
    let mut f1 = File::open("foo.txt")?;
    let mut f2 = File::open("bar.txt")?;

    let mut handle = f1.chain(f2);
    let mut buffer = String::new();

    // Считать значение в строку. Здесь можно использовать любой метод Read
    handle.read_to_string(&mut buffer)?;
    Ok(())
}
</code></pre>

---

<pre><code class="language-rust">
use std::io::{self, Read};

fn main() -> io::Result<()> {
    let a = b"Hello, ";
    let b = b"world!";

    // Объединим два источника
    let mut chained = a.as_ref().chain(b.as_ref());

    let mut result = String::new();
    chained.read_to_string(&mut result)?;

    println!("Результат: {}", result); // "Hello, world!"
    Ok(())
}
</code></pre>
