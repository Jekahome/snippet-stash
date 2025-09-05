

Вы должны заметить, что основной метод очень похож на основной метод межпоточной связи, определенный выше, если сервер был перемещен в свою собственную функцию.
<pre><code class="language-rust">
extern crate session_types;
use session_types::*;
type Client = Send<u32, Eps>;
type Server = Recv<u32, Eps>;

fn run_client(channel: Chan<(), Client>) {
    let channel = channel.send(42);
    println!("The client just sent the number 42!");
    channel.close();
}
fn run_server(channel: Chan<(), Server>) {
    let (channel, data) = channel.recv();
    println!("The server received some data: {}", data);
    channel.close();
}
fn main() {
    let (server_channel, client_channel) = session_channel(); 
    let server_thread = std::thread::spawn(move || {
        run_server(server_channel);
    });

    run_client(client_channel);
    server_thread.join().unwrap();
}
</code></pre>
