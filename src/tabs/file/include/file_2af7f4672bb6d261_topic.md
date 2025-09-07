





<pre><code class="language-rust no_run edition2024">
pub enum SeekFrom {
    Start(u64),      // смещение от начала потока
    End(i64),        // смещение от конца потока
    Current(i64),    // смещение от текущей позиции
}

</code></pre>
