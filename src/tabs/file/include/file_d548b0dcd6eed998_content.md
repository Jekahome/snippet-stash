

По умолчанию ввод-вывод файла Rust не буферизуется. 
Если у вас много мелких и повторяющихся вызовов чтения или записи в файл или сетевой сокет, используйте BufReader или BufWriter. 
Они поддерживают буфер в памяти для ввода и вывода, сводя к минимуму количество требуемых системных вызовов.

❌ Например, измените этот небуферизованный выходной код:
<pre><code class="language-rust">
use std::io::Write;
let mut out = std::fs::File::create("test.txt").unwrap();
for line in lines {
    writeln!(out, "{}", line)?;
}
</code></pre>

✅ к этому:
<pre><code class="language-rust">
fn blah() -> Result<(), std::io::Error> {
    use std::io::{BufWriter, Write};
    let lines = vec!["one", "two", "three"];
    let mut out = std::fs::File::create("test.txt")?;
    let mut buf = BufWriter::new(out);
    for line in lines {
        writeln!(buf, "{}", line)?;
   }
   buf.flush()?; // для явного выброса ошибки , иначе ошибки будут прогнорированны
   Ok(())
} 
</code></pre>

Обратите внимание, что буферизация также работает с stdout, поэтому вы можете комбинировать ручную блокировку и буферизацию при выполнении большого количества операций записи в stdout
<pre><code class="language-rust">
fn blah() -> Result<(), std::io::Error> {
    use std::io::{BufWriter, Write};
    let lines = vec!["one", "two", "three"];
    let mut stdout = std::io::stdout();
    let mut lock = stdout.lock();
    let mut buf = BufWriter::new(lock);
    for line in lines {
        writeln!(buf, "{}", line)?;
    }
    buf.flush()?;
    Ok(())
} 
blah();
</code></pre>
 
