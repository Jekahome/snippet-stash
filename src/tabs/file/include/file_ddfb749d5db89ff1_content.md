


<pre><code class="language-rust">
use std::io::{Cursor, Read, Seek, SeekFrom, Write};

fn main() -> std::io::Result<()> {
    // Создаём курсор поверх вектора
    let mut cursor = Cursor::new(vec![0; 10]);

    // Пишем в буфер
    cursor.write_all(b"Hi")?;
    println!("Буфер после записи: {:?}", cursor.get_ref());

    // Узнаём и меняем позицию
    println!("Позиция: {}", cursor.position());
    cursor.set_position(0);

    // Читаем из начала
    let mut buf = [0; 2];
    cursor.read_exact(&mut buf)?;
    println!("Прочитали: {:?}", buf);

    // Доступ к внутреннему буферу
    let inner = cursor.into_inner();
    println!("Внутренний буфер: {:?}", inner);

    Ok(())
}
</code></pre>
