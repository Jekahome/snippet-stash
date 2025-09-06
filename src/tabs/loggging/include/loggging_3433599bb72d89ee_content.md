

```toml
Cargo.toml:
[dependencies]
log = "0.4"
flexi_logger = "0.27"
```



<pre><code class="language-rust">
use flexi_logger::{Logger, FileSpec};

fn main() {
    Logger::try_with_str("info")
        .unwrap()
        .log_to_file(FileSpec::default())
        .start()
        .unwrap();

    info!("Application started");
    // ...
}
</code></pre>
