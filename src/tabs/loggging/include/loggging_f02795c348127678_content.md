


<pre><code class="language-rust">
fn main(){
    Logger::try_with_str("info")
        .unwrap()
        .log_to_file(FileSpec::default().directory("logs/info"))
        .log_to_file(FileSpec::default().directory("logs/errors").only_errors())
        .start()
        .unwrap();
}
</code></pre>
