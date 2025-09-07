

Trait `std::io::BufRead` — это надстройка над `std::io::Read`, которая добавляет **удобные методы для построчного и побайтового чтения с буферизацией**.

Trait `std::io::BufRead` реализуется источниками данных, которые могут эффективно буферизовать ввод.

Обычно используется через `struct std::io::BufReader<File>`, `Cursor<&[u8]>` и т.п.

Позволяет читать данные по строкам или до разделителя.


**Методы Trait std::io::BufRead**

* **fill_buf**() - Возвращает ссылку на внутренний буфер с данными, которые уже прочитаны, но ещё не потреблены. Не продвигает указатель, можно многократно читать один и тот же кусок.
* **consume**() - Сообщает, что amt байт уже использованы из буфера. Уменьшает буфер и продвигает указатель.
* **lines** - Возвращает итератор по строкам (`Result<String>`). Убирает символ новой строки `\n` (и `\r\n` на Windows).
* **read_line** - Читает **одну строку** (включая `\n`, если есть). Добавляет в конец `buf`.
* **read_until** - Читает данные в буфер **до указанного байта включительно**. Удобно для чтения до `\n` или любого другого разделителя.
* **split** - Возвращает итератор по кускам, разделённым указанным байтом. Похож на `str::split`, только работает на потоках байтов.

<pre><code class="language-rust">
use std::fs::File;
use std::io::{self, BufRead, BufReader};

fn main() -> io::Result<()> {
    let file = File::open("example.txt")?;
    let mut reader = BufReader::new(file);

    // read_line
    let mut line = String::new();
    reader.read_line(&mut line)?;
    println!("Первая строка: {}", line);

    // lines (итератор по строкам)
    for l in reader.lines() {
        println!("Строка: {}", l?);
    }

    // read_until
    let mut buffer = Vec::new();
    let mut reader = BufReader::new(File::open("example.txt")?);
    reader.read_until(b' ', &mut buffer)?;
    println!("До пробела: {:?}", String::from_utf8_lossy(&buffer));

    // split
    let mut reader = BufReader::new(File::open("example.txt")?);
    for chunk in reader.split(b' ') {
        println!("Фрагмент: {:?}", String::from_utf8_lossy(&chunk?));
    }
    Ok(())
}
</code></pre>
