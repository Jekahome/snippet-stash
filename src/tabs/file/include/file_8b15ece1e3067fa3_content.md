

```
use std::io::prelude::*;
use std::io::{self, SeekFrom};
use std::fs::File;
// библиотечная функция, которую мы написали
fn write_ten_bytes_at_end<W: Write + Seek>(writer: &mut W) -> io::Result<()> {
    writer.seek(SeekFrom::End(-10))?;

    for i in 0..10 {
        writer.write(&[i])?;
    }
    // all went well
    Ok(())
}

// Вот код, использующий эту библиотечную функцию. 
// 
// Возможно, для эффективности нам понадобится BufReader, но давайте 
// сосредоточимся на этом примере.
let mut file = File::create("foo.txt")?;

write_ten_bytes_at_end(&mut file)?;

// теперь давайте напишем тест
#[test]
fn test_writes_bytes() {
    // Создание настоящего файла гораздо медленнее, чем создание буфера в памяти, 
    // Давайте вместо этого используем курсор
    use std::io::Cursor;
    let mut buff = Cursor::new(vec![0; 15]);

    write_ten_bytes_at_end(&mut buff).unwrap();
    assert_eq!(&buff.get_ref()[5..15], &[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
}
```
