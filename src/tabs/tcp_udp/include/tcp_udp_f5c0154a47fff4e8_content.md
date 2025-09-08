

**TCP Синхронно:**
<pre><code class="language-rust">
use std::net::TcpStream;
use std::io::{Read, Write};

fn main() -> std::io::Result<()> {
    let mut stream = TcpStream::connect("example.com:80")?;
    stream.write_all(b"GET / HTTP/1.1\r\nHost: example.com\r\n\r\n")?;
    
    let mut response = String::new();
    stream.read_to_string(&mut response)?;
    println!("{}", response);
    Ok(())
}
 
</code></pre>


**TCP Асинхронно (Tokio):**
<pre><code class="language-rust">
use tokio::net::TcpStream;
use tokio::io::{AsyncReadExt, AsyncWriteExt};

#[tokio::main]
async fn main() -> std::io::Result<()> {
    let mut stream = TcpStream::connect("example.com:80").await?;
    stream.write_all(b"GET / HTTP/1.1\r\nHost: example.com\r\n\r\n").await?;

    let mut response = vec![0; 1024];
    let n = stream.read(&mut response).await?;
    println!("{}", String::from_utf8_lossy(&response[..n]));
    Ok(())
}
</code></pre>
