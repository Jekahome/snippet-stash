


<pre><code class="language-rust no_run edition2024">
async fn read_send(file: &mut File, channel: &mut Sender<...>) {
  loop {
    future::poll_fn(|cx| channel.poll_ready(cx)).await; // Waits until channel has a slot
    let item = read_next_and_parse(file).await; // Only read the minimum for one item, to avoid multiple items
    channel.try_send(item).unwrap();  // We are guaranteed a slot in the channel as per above
  }
}
</code></pre>
