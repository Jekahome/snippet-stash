


<pre><code class="language-rust">
fn main(){
    let mut logger = Logger::try_with_str("info").unwrap();
    // ...
    if debug_mode {
        logger = logger.log_to_file("debug.log").modify_max_log_level(log::LevelFilter::Debug);
    }
    let _logger = logger.start().unwrap();
}
</code></pre>
