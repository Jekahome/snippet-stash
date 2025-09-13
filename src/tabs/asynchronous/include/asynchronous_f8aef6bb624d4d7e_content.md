

```
fn get_future(val:String)-> impl Future<Item=String, Error=()>{
    MyTask(val)
}

#[derive(Debug)]
struct Client {
    ping_count: u8,
}

impl Client {
    fn new() -> Self {
        Client { ping_count: 0 }
    }
    fn send_ping(self) -> futures::future::FutureResult<Self, std::io::Error> {
        futures::future::ok(Client { ping_count: self.ping_count + 1 })
    }
    fn receive_pong(self) -> futures::future::FutureResult<(Self, bool), std::io::Error> {
        let done = self.ping_count >= 5;
        futures::future::ok((self, done))
    }
}
```
