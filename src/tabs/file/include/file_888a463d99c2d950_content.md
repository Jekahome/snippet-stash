

Метод **lines**() возвращает итератор, проходящий через все строки файла.
<pre><code class="language-rust">
use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;

fn main() {
    // Файл `hosts` должен существовать в текущей директории
    if let Ok(lines) = read_lines("./hosts") {
        // Получает итератор, который возвращает Option
        for line in lines {
            if let Ok(ip) = line {
                println!("{}", ip);
            }      
        }   
    }
}
// File::open работает с чем-то, что реализует типаж `AsRef<Path>`. Поэтому read_lines() будет ожидать это же.
// Для обработки ошибок, возвращаемое значение оборачивается в Result
// Возвращаем `Iterator` для построчного чтения файла.
fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>> where P: AsRef<Path>, {
    let file = File::open(filename)?;
    Ok(io::BufReader::new(file).lines())
}
</code></pre>
