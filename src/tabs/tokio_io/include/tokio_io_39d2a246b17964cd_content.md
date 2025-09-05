


<pre><code class="language-rust">
use tokio::net::{TcpListener, TcpStream};
use mini_redis::{Connection, Frame};

#[tokio::main]
async fn main() {
    let listener = TcpListener::bind("127.0.0.1:6379").await.unwrap();
    loop {
        let (socket, _) = listener.accept().await.unwrap();
        let handle = tokio::spawn(async move {
            process(socket).await
        });
        let out = handle.await.unwrap();
        println!("GOT {}", out);
    }
}
async fn process(socket: TcpStream) -> bool{
    let mut connection = Connection::new(socket);

    if let Some(frame) = connection.read_frame().await.unwrap() {
        println!("GOT: {:?}", frame);

        // Respond with an error
        let response = Frame::Error("unimplemented".to_string());
        connection.write_frame(&response).await.unwrap();
        return true;
    }
    false
}
</code></pre>
