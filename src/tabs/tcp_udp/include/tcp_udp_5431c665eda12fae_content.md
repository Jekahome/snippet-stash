

**UDP Синхронно:**
<pre><code class="language-rust">
use std::net::UdpSocket;

fn main() -> std::io::Result<()> {
    let socket = UdpSocket::bind("0.0.0.0:0")?;
    socket.send_to(b"hello", "example.com:8080")?;

    let mut buf = [0; 1024];
    let (amt, src) = socket.recv_from(&mut buf)?;
    println!("Received {} bytes from {}: {:?}", amt, src, &buf[..amt]);
    Ok(())
}
</code></pre>

**UDP Асинхронно (Tokio):**
<pre><code class="language-rust">
use tokio::net::UdpSocket;

#[tokio::main]
async fn main() -> std::io::Result<()> {
    let socket = UdpSocket::bind("0.0.0.0:0").await?;
    socket.send_to("hello".as_bytes(), "example.com:8080").await?;

    let mut buf = [0; 1024];
    let (amt, src) = socket.recv_from(&mut buf).await?;
    println!("Received {} bytes from {}: {:?}", amt, src, &buf[..amt]);
    Ok(())
}
</code></pre>
