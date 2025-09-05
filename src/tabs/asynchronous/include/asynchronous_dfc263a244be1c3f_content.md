


<pre><code class="language-rust no_run edition2024">
fn main(){
    let mut file = ...;
    let mut channel = ...;

    tokio::spawn(async move {
        read_send(&mut file, &mut channel).await;
    });

    loop {
        let some_data = socket.read_packet().await;
        // ...
    }
}
</code></pre>
