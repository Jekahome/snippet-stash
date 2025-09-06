

Cargo.toml:
```toml
# log
log = "0.4"
tracing = "0.1"
tracing-subscriber = { version = "0.3", features = ["json", "fmt","std","env-filter", "time"] }
tracing-appender = "0.2"
```
 
<pre><code class="language-rust">
pub use log::init;
pub mod log {
    use std::fs::OpenOptions;
    use tracing_appender::non_blocking::WorkerGuard;
    use tracing_subscriber::{
        fmt::{format::FmtSpan, time, SubscriberBuilder},
        EnvFilter,
    };
    pub struct GuardLogger {
        _guard: WorkerGuard,
    }
    pub fn init() -> GuardLogger {
        let general_log_path = ".general.ndjson.log";
        let file_appender = OpenOptions::new()
            .append(true)
            .create(true)
            .open(general_log_path)
            .expect("Failed to open log file");
        let (non_blocking, guard) =
            tracing_appender::non_blocking(file_appender);
        let env_filter = EnvFilter::from_default_env();
        let subscriber = SubscriberBuilder::default()
            .json()
            .with_timer(time::UtcTime::rfc_3339())
            .with_env_filter(env_filter)
            .with_span_events(FmtSpan::CLOSE)
            .with_file(true)
            .with_line_number(true)
            .with_thread_ids(false)
            .with_thread_names(false)
            .with_target(false)
            .with_writer(non_blocking)
            .finish();

        tracing::subscriber::set_global_default(subscriber)
            .expect("setting default subscriber failed");
        GuardLogger { _guard: guard }
    }
}

// Use:
use tracing::info;
#[tokio::main]
async fn main() {
   let _guard_log = logger::init();
   info!("path_dir: {:?} OS:{}", path_dir.as_ref(), std::env::consts::OS);
}
</code></pre>
