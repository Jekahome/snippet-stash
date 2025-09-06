


<pre><code class="language-rust">
fn main(){
    Logger::try_with_str("warn")
        .unwrap()
        .log_to_file(FileSpec::default())
        .append()
        .o_non_block()
        .o_sync()
        .start()
        .unwrap();
}
</code></pre>
