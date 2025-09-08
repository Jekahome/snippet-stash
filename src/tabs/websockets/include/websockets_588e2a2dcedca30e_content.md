

Подход с warp особенно удобен, если нужно сочетать WebSocket с обычными HTTP эндпоинтами.
<pre><code class="language-rust no_run edition2024">
use warp::Filter;

#[tokio::main]
async fn main() {
    let ws_route = warp::path("ws")
        .and(warp::ws())
        .map(|ws: warp::ws::Ws| {
            ws.on_upgrade(|socket| async move {
                let (mut tx, mut rx) = socket.split();
                while let Some(msg) = rx.next().await {
                    let msg = msg.unwrap();
                    tx.send(msg).await.unwrap(); // echo
                }
            })
        });

    warp::serve(ws_route).run(([127,0,0,1], 3030)).await;
}
</code></pre>
