


<pre><code class="language-rust">
pub struct Server {
    listener: TcpListener,
    connections: Vec<Box<Future<Item = (), Error = io::Error> + Send>>,
}

impl Future for Server {
    type Item = ();
    type Error = io::Error;

    fn poll(&mut self) -> Result<Async<()>, io::Error> {
        // First, accept all new connections
        loop {
            match self.listener.poll_accept()? {
                Async::Ready((socket, _)) => {
                    let connection = process(socket);
                    self.connections.push(Box::new(connection));
                }
                Async::NotReady => break,
            }
        }

        // Now, poll all connection futures.
        let len = self.connections.len();

        for i in (0..len).rev() {
            match self.connections[i].poll()? {
                Async::Ready(_) => {
                    self.connections.remove(i);
                }
                Async::NotReady => {}
            }
        }

        // `NotReady` is returned here because the future never actually
        // completes. The server runs until it is dropped.
        Ok(Async::NotReady)
    }
}
</code></pre>
