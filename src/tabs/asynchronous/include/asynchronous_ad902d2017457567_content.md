


<pre><code class="language-rust no_run edition2024">
struct ReadSend<'a> {
    file: &'a mut File,
    channel: &'a mut Sender<...>,
    items: Vec<...>,
}

impl ReadSend {
    async pub fn next(&mut self) {
        // Never use any local variable across an await point
        loop {
            for item in self.items.drain() {
                self.channel.send(item).await;
            }

            let data = read_next(self.file).await;
            self.items = parse(&data);
        }
    }
}
</code></pre>
