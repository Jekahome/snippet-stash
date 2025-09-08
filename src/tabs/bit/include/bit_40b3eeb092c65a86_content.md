


**Конвертация строк ↔ байты**

* `String` → `Vec<u8>`:

<pre><code class="language-rust">
fn main(){
  let s = String::from("hello");
  let bytes = s.into_bytes(); // Vec<u8>
}
</code></pre>

* `&str` → `&[u8]`:

<pre><code class="language-rust">
fn main(){
  let s = "hello";
  let bytes = s.as_bytes();
}
</code></pre>

* `Vec<u8>` → `String`:

<pre><code class="language-rust">
fn main(){
  let bytes = vec![104, 101, 108, 108, 111]; // "hello"
  let s = String::from_utf8(bytes).unwrap();
}
</code></pre>
 

**Чтение и запись байтов**

* Файлы:

<pre><code class="language-rust">
fn main(){
  use std::fs;

  let data = fs::read("file.bin")?; // Vec<u8>
  fs::write("file.bin", &data)?;
}
</code></pre>


* Сеть (через `TcpStream`):
<pre><code class="language-rust">
fn main(){
  use std::net::TcpStream;
  use std::io::{Read, Write};

  let mut stream = TcpStream::connect("example.com:80")?;
  stream.write_all(b"GET / HTTP/1.0\r\n\r\n")?;

  let mut buf = [0u8; 512];
  let n = stream.read(&mut buf)?;
  println!("Read {} bytes", n);
}
</code></pre>
