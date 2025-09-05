

Каждая точка await в асинхронном коде представляет собой момент, когда выполнение может быть прервано, а контроль — возвращен пользователю этого future. Пользователь может при желании удалить future в этой точке, полностью остановив его выполнение.
<pre><code class="language-rust">
async fn read_send(file: &mut File, channel: &mut Sender<...>) {
  loop {
    let data = read_next(file).await;
    let items = parse(&data);
    for item in items {
      channel.send(item).await;
    }
  }
}
</code></pre>
