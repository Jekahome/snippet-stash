

Клиент может вызвать `Greeter::hello("Alice")` через HTTP/2 — и это будет похоже на обычный вызов метода.
<pre><code class="language-rust">
use hrpc::prelude::*;

#[derive(hrpc::Service)]
pub trait Greeter {
    async fn hello(&self, name: String) -> String;
}

pub struct GreeterImpl;

#[hrpc::async_trait]
impl Greeter for GreeterImpl {
    async fn hello(&self, name: String) -> String {
        format!("Привет, {}!", name)
    }
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    hrpc::serve(GreeterImpl)
        .addr("127.0.0.1:5000")
        .run()
        .await?;
    Ok(())
}
</code></pre>
