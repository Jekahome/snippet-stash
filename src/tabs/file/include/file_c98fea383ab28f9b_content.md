

**Методы Struct std::io::BufReader**

* **new**() - Создаёт BufReader с внутренним буфером по умолчанию (8 КБ).
* **with_capacity**() - Создаёт BufReader с буфером указанного размера cap.
* **get_ref**() - Возвращает ссылку на внутренний поток (для чтения без изменения).
* **get_mut**() - Возвращает изменяемую ссылку на внутренний поток, чтобы можно было напрямую работать с ним.
* **into_inner**() - Извлекает внутренний поток, уничтожая BufReader.
* **buffer**() - Возвращает содержимое внутреннего буфера, которое ещё не было прочитано.
* **capacity**() - Возвращает размер внутреннего буфера.
* **peek**() - Позволяет посмотреть на следующий доступный кусок данных, не продвигая указатель.
* **seek_relative**() - Перемещает указатель относительно текущей позиции, учитывая буфер.

<pre><code class="language-rust">
use std::io::{BufReader, Cursor, Read};

fn main() -> std::io::Result<()> {
    let data = b"Hello, BufReader!";
    let cursor = Cursor::new(&data[..]);
    let mut reader = BufReader::with_capacity(8, cursor);

    // peek: посмотрим на буфер
    let buf = reader.peek()?;
    println!("Peek: {:?}", std::str::from_utf8(buf).unwrap());

    // buffer: текущий непрочитанный буфер
    let buf2 = reader.buffer();
    println!("Buffer: {:?}", std::str::from_utf8(buf2).unwrap());

    // чтение и продвижение
    let mut output = Vec::new();
    reader.read_to_end(&mut output)?;
    println!("Read to end: {:?}", String::from_utf8(output).unwrap());

    // доступ к внутреннему Cursor
    let inner = reader.into_inner();
    println!("Inner position: {}", inner.position());

    Ok(())
}
</code></pre>
