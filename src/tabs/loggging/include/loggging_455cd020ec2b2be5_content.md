

Файл Cargo.toml:
```toml
chrono = "0.4"
# log
slog = "2.7"
slog-scope = "4.4"
slog-stdlog = "4.1"
slog-async = "2.8"
slog-json = "2.6"
slog-envlogger = "2.2"
log = "0.4"
```
 
<pre><code class="language-rust">
//! Logging application state transition steps.
//! Logs are saved to a file in NDJSON format.

pub use logger::init;
pub mod logger {
    use slog::{o, Drain, Filter, FnValue, PushFnValue, Record, *};
    use std::{fs::OpenOptions, time::Duration};

    pub struct GuardLogger {
        _guard: slog_scope::GlobalLoggerGuard,
    }
    impl GuardLogger {
        pub fn emergency_data_reset(&self) {
            std::thread::sleep(Duration::from_secs(2));
        }
    }

    pub fn init() -> GuardLogger {
        let general_log_path = ".general.ndjson.log";
        let event_target_log_path = ".event.ndjson.log";

        let general_drain = {
            let file_general = OpenOptions::new()
                .append(true)
                .create(true)
                .truncate(false)
                .open(general_log_path)
                .unwrap();
            let builder = slog_json::Json::new(file_general)
                .set_pretty(false)
                .set_flush(false)
                .set_newlines(true);

            let drain = builder.build().fuse();
            let drain = slog_async::Async::new(drain).build().fuse();
            let drain = slog_envlogger::new(drain).fuse();
            let drain_filter = Filter::new(drain, |record| {
                !record.tag().starts_with("EV")
            })
            .fuse();
            drain_filter
        };

        let event_drain = {
            let file_special_target = OpenOptions::new()
                .append(true)
                .create(true)
                .truncate(false)
                .open(event_target_log_path)
                .unwrap();
            let builder = slog_json::Json::new(file_special_target)
                .set_pretty(false)
                .set_flush(false)
                .set_newlines(true);

            let drain = builder.build().fuse();
            let drain: Fuse<slog_async::Async> =
                slog_async::Async::new(drain).build().fuse();
            let drain = slog_envlogger::new(drain).fuse();
            let drain_filter =
                Filter::new(drain, |record| record.tag().starts_with("EV"))
                    .fuse();
            drain_filter
        };

        let drain = slog::Duplicate::new(general_drain, event_drain).fuse();

        let values = o!(
            "version" => env!("CARGO_PKG_VERSION"),
            "OS" => std::env::consts::OS,
            "ts" => PushFnValue(move |_: &Record, ser| {
                ser.emit(chrono::Utc::now().to_rfc3339())
            }),
            "lvl" => FnValue(move |rinfo: &Record| {
                rinfo.level().as_str()
            }),
            "msg" => PushFnValue(move |record: &Record, ser| {
                ser.emit(record.msg())
            }),
        );
        let logger = slog::Logger::root(drain, values);
        let guard = slog_scope::set_global_logger(logger); // перенаправляет все вызовы макросов log info! error! ... в slog
        slog_stdlog::init().unwrap();
        GuardLogger { _guard: guard }
    }
}
fn main() -> anyhow::Result<()> {
    let guard_log = my_mod_log::init();
    info!("API info!: {}", "URL");
    info!(target: "EV ", "API info!: port: {}, speed: {}","PORT", "SPEED");
    debug!("API debug!: {}", "MESSAGE");
    warn!("API warn!: {}", "MESSAGE");
    trace!("API trace!: {:?}", ["MESSAGE", "MESSAGE", "MESSAGE"]);
    error!("API error!: {}", "MESSAGE");
 
    let result = Cli::try_parse();
    match result {
        Ok(cli) => match &cli.command {
            Commands::FileContent { path_file } => {
                wrap_file_content(path_file);
            }
            Commands::ResourceList { path_dir } => {
                wrap_resource_list(path_dir);
            }
            Commands::AnyCommandExecute {
                command,
                path_dir,
                path_file,
            } => {
                wrap_execute_any_command(command, path_dir, path_file.as_ref());
            }
        },
        Err(error) => {
            eprintln!("{}", error);
            guard_log.emergency_data_reset();
            std::process::exit(2);
        }
    }
    Ok(())
}

</code></pre>

Запуск:
```
RUST_LOG=warn cargo run
```

