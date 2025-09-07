

**Методы Struct std::io::BufWriter**

* **new**() - Создаёт BufWriter с внутренним буфером по умолчанию (8 КБ).
* **with_capacity**() - Создаёт BufWriter с буфером указанного размера cap.
* **get_ref**() - Возвращает ссылку на внутренний поток, без влияния на запись.
* **get_mut**() - Возвращает изменяемую ссылку на внутренний поток, чтобы можно было писать напрямую.
* **into_inner**() - Извлекает внутренний поток, сбрасывая буфер перед возвратом. Если не удалось сбросить буфер (ошибка записи), возвращает ошибку.
* **into_parts**() - Разделяет BufWriter на: внутренний поток W оставшийся буфер `Vec<u8>`, который ещё не был записан
* **buffer**() - Возвращает неотправленные данные из внутреннего буфера.
* **capacity**() - Возвращает размер внутреннего буфера.

<pre><code class="language-rust">
use std::io::{BufWriter, Write, Cursor};

fn main() -> std::io::Result<()> {
    let cursor = Cursor::new(Vec::new());
    let mut writer = BufWriter::with_capacity(8, cursor);

    // Пишем данные
    writer.write_all(b"Hello, ")?;
    writer.write_all(b"Rust!")?;

    // buffer: посмотрим, что ещё не записано
    println!("Buffer: {:?}", writer.buffer());

    // capacity: размер буфера
    println!("Capacity: {}", writer.capacity());

    // flush: сброс буфера в Cursor
    writer.flush()?;

    // Получаем внутренний поток
    let cursor = writer.into_inner()?;
    let data = cursor.into_inner();
    println!("Записанные данные: {:?}", String::from_utf8(data).unwrap());
    
    Ok(())
}
</code></pre>

