

Проблемы производительности могут легко проявиться в программах на Rust, когда буферизация не используется. 
Возьмем, к примеру, serde_json, библиотеку для чтения и записи данных в JSON с простым в использовании интерфейсом. 
Его from_reader() функция принимает любой объект, реализующий Read признак, и декодирует байты в дерево JSON. 
В File орудии типа Read признак, так что мы можем очень легко расшифровать файл на диске. 
Вот простая программа, которая делает это, и она File намеренно не заключена в BufReader объект.
<pre><code class="language-rust">
use std::{fs, io};
fn main() -> io::Result<()> {
    let mut f = fs::File::open("sample.json")?;
    let v: serde_json::Value = serde_json::from_reader(&mut f).unwrap();
    println!("{}", v.is_object());
    return Ok(());
}
</code></pre>

Мы можем использовать, perf чтобы подсчитать, сколько системных вызовов read() было сделано при выполнении этой программы.

```
$ sudo perf stat -e syscalls:sys_enter_read ./target/release/04_unbuffered_json
 Performance counter stats for './target/release/04_unbuffered_json':
         2,009,119      syscalls:sys_enter_read
```

Размер файла sample.json составляет 2009 108 байт. Чтобы десериализовать файл, serde_json выполняет один системный вызов на каждый байт! (Дополнительные 11 системных вызовов read() происходят в начале программы для загрузки libc и т. Д.) Наш надежный партнер strace подтверждает, что это так.

```
$ strace --trace=read ./target/release/04_unbuffered_json
...
read(3, "{", 1)                         = 1
read(3, "\"", 1)                        = 1
read(3, "t", 1)                         = 1
read(3, "y", 1)                         = 1
read(3, "p", 1)                         = 1
read(3, "e", 1)                         = 1
read(3, "\"", 1)                        = 1
read(3, ":", 1)                         = 1
...
```

Когда мы исправляем программу, помещая наш файл внутрь буферизованного ридера, результаты поразительны. Мы уменьшаем количество системных вызовов почти в 8000 раз - что имеет большой смысл, потому что мы читаем 8192 байта за раз вместо одного - и программа работает в 11 раз быстрее.
<pre><code class="language-rust">
use std::{fs, io};
fn main() -> io::Result<()> {
    let mut f = BufWriter::new(fs::File::open("sample.json")?);
    let v: serde_json::Value = serde_json::from_reader(&mut f).unwrap();
    println!("{}", v.is_object());
    return Ok(());
}
</code></pre>
 
```
$ sudo perf stat -e syscalls:sys_enter_read ./target/release/05_buffered_json
 Performance counter stats for './target/release/05_buffered_json':
               257      syscalls:sys_enter_read
```

```
$ strace --trace=read ./target/release/05_buffered_json
...
read(3, "{\"type\":\"FeatureCollection\",\"crs"..., 8192) = 8192
read(3, "6200000000001}},{\"type\":\"Feature"..., 8192) = 8192
read(3, "egion\":\"AK\",\"category\":\"In-betwe"..., 8192) = 8192
read(3, "01}},{\"type\":\"Feature\",\"id\":95,\""..., 8192) = 8192
...

$ hyperfine -w 5 -m 30 \
    ./target/release/04_unbuffered_json \
    ./target/release/05_buffered_json
Benchmark #1: ./target/release/04_unbuffered_json
  Time (mean ± σ):     326.3 ms ±   8.1 ms    [User: 70.2 ms, System: 256.0 ms]
  Range (min … max):   312.2 ms … 346.8 ms    30 runs

Benchmark #2: ./target/release/05_buffered_json
  Time (mean ± σ):      28.5 ms ±   1.4 ms    [User: 22.9 ms, System: 5.6 ms]
  Range (min … max):    26.2 ms …  33.2 ms    106 runs

Summary
  './target/release/05_buffered_json' ran
   11.43 ± 0.63 times faster than './target/release/04_unbuffered_json'
```





