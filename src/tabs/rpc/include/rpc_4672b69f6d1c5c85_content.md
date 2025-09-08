


<pre><code class="language-rust">
use tarpc::context;
use tarpc::server::{self, incoming::Incoming};
use tarpc::serde_transport::tcp;
use tarpc::tokio_serde::formats::Json;
use tokio::net::TcpListener;

#[tarpc::service]
pub trait World {
    async fn hello(name: String) -> String;
}

#[derive(Clone)]
struct WorldServer;

#[tarpc::server]
impl World for WorldServer {
    async fn hello(self, _: context::Context, name: String) -> String {
        format!("Привет, {}!", name)
    }
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let listener = TcpListener::bind("0.0.0.0:8080").await?;
    let server = listener
        .incoming()
        .map_ok(|s| {
            let transport = tcp::Transport::from((s, Json::default()));
            transport
        })
        .map_ok(Incoming::from)
        .try_for_each(|incoming| async move {
            incoming.respond_with(WorldServer.serve()).await?;
            Ok(())
        });
    server.await?;
    Ok(())
}
</code></pre>
