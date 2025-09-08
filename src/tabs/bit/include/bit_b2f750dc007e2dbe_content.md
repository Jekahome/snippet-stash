


<pre><code class="language-rust">
use byteorder::{BigEndian, LittleEndian, ReadBytesExt, WriteBytesExt};
use std::io::Cursor;

fn main() -> std::io::Result<()> {
    // 1. Создаём поток-буфер
    let mut buffer = Cursor::new(Vec::new());

    // 2. Записываем числа с разной эндийностью
    let num1: u32 = 0x12345678;
    let num2: u16 = 0xABCD;

    // Записываем num1 в big-endian (сетевой порядок)
    buffer.write_u32::<BigEndian>(num1)?;
    // Записываем num2 в little-endian
    buffer.write_u16::<LittleEndian>(num2)?;

    println!("Буфер после записи: {:x?}", buffer.get_ref());

    // 3. Перематываем курсор для чтения
    buffer.set_position(0);

    // 4. Читаем числа обратно, явно указывая эндийность
    let read_num1 = buffer.read_u32::<BigEndian>()?;
    let read_num2 = buffer.read_u16::<LittleEndian>()?;

    println!("Прочитано num1: 0x{:08X}", read_num1);
    println!("Прочитано num2: 0x{:04X}", read_num2);

    Ok(())
}
</code></pre>

Объяснение

1. **`Cursor<Vec<u8>>`** — имитация потока данных в памяти.
2. **WriteBytesExt** — позволяет писать числа в поток в нужной эндийности: `<BigEndian>` или `<LittleEndian>`.
3. **ReadBytesExt** — позволяет читать числа из потока с явной эндийностью.
4. Важно: **эндийность должна совпадать при записи и чтении**, иначе числа будут "перевернутыми".



Вывод программы

```
Буфер после записи: [12, 34, 56, 78, cd, ab]
Прочитано num1: 0x12345678
Прочитано num2: 0xABCD
```

* `num1` записан как big-endian → `0x12 34 56 78`.
* `num2` записан как little-endian → `0xCD AB`.
* Чтение обратно с правильной эндийностью даёт точные значения.

