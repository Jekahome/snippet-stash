


<pre><code class="language-rust">
use std::io::Result;
use std::pin::Pin;
use std::task::{Context, Poll};
use tokio::io::{AsyncRead, AsyncWrite};
use tokio::io::ReadBuf;

struct MemBuffer {
    data: Vec<u8>,
    read_pos: usize,
}
impl MemBuffer {
    fn new() -> Self {
        Self {
            data: Vec::new(),
            read_pos: 0,
        }
    }
}
impl AsyncRead for MemBuffer {
    fn poll_read(
        mut self: Pin<&mut Self>,
        _cx: &mut Context,
        buf: &mut ReadBuf<'_>,
    ) -> Poll<Result<()>> {
        // Calculate the number of available bytes to read
        let available = self.data.len() - self.read_pos;
        // Determine the number of bytes to read, taking the minimum of the remaining capacity of ReadBuf and the available bytes
        let bytes_to_read = available.min(buf.remaining());
        // Get the slice of data to be read from MemBuffer
        let data = &self.data[self.read_pos..self.read_pos + bytes_to_read];
        // Put the data slice into the ReadBuf
        buf.put_slice(data);
        // Update the read position in MemBuffer
        self.read_pos += bytes_to_read;
        Poll::Ready(Ok(()))
    }
}
impl AsyncWrite for MemBuffer {
    fn poll_write(
        mut self: Pin<&mut Self>,
        _cx: &mut Context,
        buf: &[u8],
    ) -> Poll<Result<usize>> {
        self.data.extend_from_slice(buf);
        Poll::Ready(Ok(buf.len()))
    }
    fn poll_flush(self: Pin<&mut Self>, _cx: &mut Context) -> Poll<Result<()>> {
        // Since our buffer is in-memory, we don't need to do anything to flush.
        Poll::Ready(Ok(()))
    }
    fn poll_shutdown(self: Pin<&mut Self>, _cx: &mut Context) -> Poll<Result<()>> {
        // No special shutdown procedure is required for our in-memory buffer.
        Poll::Ready(Ok(()))
    }
}

use tokio::io::{AsyncReadExt, AsyncWriteExt};
#[tokio::main]
async fn main() -> std::result::Result<(), Box<dyn std::error::Error>> {
    let mut buffer = MemBuffer::new();
    // Write data to the buffer
    buffer.write_all(b"Hello, world!").await?;
    // Reset the read position to read from the beginning
    buffer.read_pos = 0;
    // Read the data back from the buffer
    let mut read_buf = vec![0; 13];
    buffer.read_exact(&mut read_buf).await?;
    assert_eq!(read_buf, b"Hello, world!");
    println!("Successfully read data: {:?}", String::from_utf8(read_buf)?);
    Ok(())
}
</code></pre>
