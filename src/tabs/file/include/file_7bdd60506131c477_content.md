

**Пример: запись в память с буферизацией**

<pre><code class="language-rust">
use std::io::{BufWriter, Write, Cursor};

fn main() -> std::io::Result<()> {
    // Создаём Cursor поверх вектора в памяти
    let cursor = Cursor::new(Vec::new());

    // Оборачиваем его в BufWriter для буферизованной записи
    let mut writer = BufWriter::new(cursor);

    // Пишем данные
    writeln!(writer, "Hello, Rust!")?;
    writeln!(writer, "Writing to memory with BufWriter")?;

    // flush() — сбрасываем буфер в Cursor
    writer.flush()?;

    // Получаем внутренний вектор из Cursor
    let cursor = writer.into_inner()?; // writer возвращает Cursor<Vec<u8>>
    let data = cursor.into_inner();    // Cursor возвращает Vec<u8>

    // Превращаем байты в строку для проверки
    let result = String::from_utf8(data).unwrap();
    println!("Результат записи:\n{}", result);

    Ok(())
}

</code></pre>
