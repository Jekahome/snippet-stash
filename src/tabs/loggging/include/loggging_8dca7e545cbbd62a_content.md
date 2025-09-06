

```toml
log = "0.4"
env_logger = "0.9"
async-log = "2.0.*" 
slog-async = "2.7"
slog-json = "2.4"
slog-stream = "1.2"
slog-term = "2.8"
slog-scope = "4.4"
slog = "2.7"
chrono = "0.4"
```

<pre><code class="language-rust">
#[macro_use(o, slog_log, slog_trace, slog_debug, slog_info, slog_warn, slog_error)]
extern crate slog;
extern crate slog_async;
extern crate slog_json;
extern crate slog_stream;
extern crate slog_term;
#[macro_use]
extern crate slog_scope;
use std::fs::OpenOptions;

use slog::Drain;

use std::fs::File;
use std::io;
use std::sync::Mutex;

//use slog_bunyan::new;
use slog::Duplicate;
use slog::Level;
use slog::Logger;

use slog::*;
use std::time::{Duration, SystemTime};

use slog_async::Async;

/*
* [slog-term] (https://docs.rs/slog-term/) для вывода терминала
* [slog-async] (https://docs.rs/slog-async/ ) для асинхронного ведения журнала
* [slog-json] (https://docs.rs/slog-json/) для ведения журнала JSON
* [slog-syslog] (https://docs.rs/slog-syslog/) для logging to syslog
* [sloggers] (https://docs.rs/sloggers/) для удобства методов
*/

fn main() {
    // Перевод на JSON
    // Форматированный вывод как настроить
    // Первый пункт = только в консоль, но с полем "file":"app.log"
    // Как локально и глобально slog_scope ?

    /* JSON
    let d2 = Mutex::new(slog_json::Json::default(io::stdout())).fuse();
    let file_drain = slog_stream::stream(io::stdout(), slog_json::default());
    Mutex::new(slog_json::Json::default(std::io::stderr())).map(slog::Fuse);

    let drain = slog_json::Json::new(std::io::stdout())
    .set_pretty(true)
    .add_default_keys()
    .build()
    .fuse();
    let drain = slog_async::Async::new(drain).build().fuse();
    */

    // slog_term Цветастый вывод
    //let decorator = slog_term::TermDecorator::new().stdout().build();
    //let d_stdout = slog_term::CompactFormat::new(decorator).build().fuse();
    //let d_stdout = slog_async::Async::new(d_stdout).build().fuse();

    //let decorator = slog_term::PlainDecorator::new(std::io::stderr());
    //let d_stderr = slog_term::FullFormat::new(decorator).build().fuse();
    //let d_stderr = slog_async::Async::new(d_stderr).build().fuse();

    // Или
    //let plain = slog_term::PlainSyncDecorator::new(std::io::stdout());
    //let d_stdout = slog_term::FullFormat::new(plain).build().fuse();

    //let plain = slog_term::PlainSyncDecorator::new(std::io::stderr());
    //let d_stderr = slog_term::FullFormat::new(plain).build().fuse();

    // Или
    //let decorator = slog_term::PlainDecorator::new(std::io::stdout());
    //let d_stdout = Async::new(slog_term::FullFormat::new(decorator).build().fuse() ).build().fuse();

    //let decorator = slog_term::PlainDecorator::new(std::io::stdout());
    //let d_stderr = Async::new(slog_term::FullFormat::new(decorator).build().fuse() ).build().fuse();

    // slog_json
    let drain = slog_json::Json::new(std::io::stdout())
        .set_pretty(false)
        .add_default_keys()
        .build()
        .fuse();
    let d_stdout = slog_async::Async::new(drain).build().fuse();

    let drain = slog_json::Json::new(std::io::stderr())
        .set_pretty(false)
        .add_default_keys()
        .build()
        .fuse();
    let d_stderr = slog_async::Async::new(drain).build().fuse();

    use std::io::ErrorKind;
    enum Cmp {
        Less = 0,
        Greater,
    }
    pub struct MyLevelFilter<D: Drain>(pub D, pub Level, pub Cmp);

    impl<D: Drain> MyLevelFilter<D> {
        pub fn new(drain: D, level: Level, cmp: Cmp) -> Self {
            MyLevelFilter(drain, level, cmp)
        }
    }

    impl<D: Drain> Drain for MyLevelFilter<D> {
        type Ok = ();
        type Err = Never;
        fn log(
            &self,
            record: &Record,
            logger_values: &OwnedKVList,
        ) -> std::result::Result<Self::Ok, Self::Err> {
            // is_at_least Возвращает true, если уровень self не ниже уровня
            // println!("record.level() = {} AND self.1 = {}",record.level().as_usize(),self.1.as_usize());
            match self.2 {
                Cmp::Less => {
                    if record.level().as_usize() <= self.1.as_usize() {
                        self.0.log(record, logger_values);
                    }
                }
                Cmp::Greater => {
                    if record.level().as_usize() >= self.1.as_usize() {
                        self.0.log(record, logger_values);
                    }
                }
            }

            // else {
            //        Err(std::io::Error::new(std::io::ErrorKind::Other, "Empty stack"))
            //     }
            Ok(())
        }
        /* #[inline]
        fn is_enabled(&self, level: Level) -> bool {
        level.is_at_least(self.1) && self.0.is_enabled(level)
        }*/
    }

    // ---------------------------------------------------------------
    pub struct Threeplicate<D1: Drain, D2: Drain, D3: Drain>(pub D1, pub D2, pub D3);
    impl<D1: Drain, D2: Drain, D3: Drain> Threeplicate<D1, D2, D3> {
        /// Create `Duplicate`
        pub fn new(drain1: D1, drain2: D2, drain3: D3) -> Self {
            Threeplicate(drain1, drain2, drain3)
        }
    }
    impl<D1: Drain, D2: Drain, D3: Drain> Drain for Threeplicate<D1, D2, D3> {
        type Ok = (D1::Ok, D2::Ok, D3::Ok);
        type Err = (
            std::result::Result<D1::Ok, D1::Err>,
            std::result::Result<D2::Ok, D2::Err>,
            std::result::Result<D3::Ok, D3::Err>,
        );
        fn log(
            &self,
            record: &Record,
            logger_values: &OwnedKVList,
        ) -> std::result::Result<Self::Ok, Self::Err> {
            let res1 = self.0.log(record, logger_values);
            let res2 = self.1.log(record, logger_values);
            let res3 = self.2.log(record, logger_values);

            match (res1, res2, res3) {
                (Ok(o1), Ok(o2), Ok(o3)) => Ok((o1, o2, o3)),
                (r1, r2, r3) => Err((r1, r2, r3)),
            }
        }
        #[inline]
        fn is_enabled(&self, level: Level) -> bool {
            self.0.is_enabled(level) || self.1.is_enabled(level) || self.2.is_enabled(level)
        }
    }
    //--------------------------------------------------------------
    //  Debug
    let log_path = "app.log";
    let file: std::fs::File = OpenOptions::new()
        .create(true)
        .write(true)
        .truncate(true)
        .open(log_path)
        .unwrap();

    let drain = slog_json::Json::new(file)
        .set_pretty(false)
        .set_newlines(true)
        .add_default_keys()
        //.add_key_value()
        .build()
        .fuse();
    let drain_file = slog_async::Async::new(drain).build().fuse();

    let drain_base = Threeplicate::new(
        MyLevelFilter::new(d_stderr, Level::Warning, Cmp::Less),
        MyLevelFilter::new(d_stdout, Level::Info, Cmp::Greater),
        MyLevelFilter::new(drain_file, Level::Trace, Cmp::Less),
    )
    .fuse();

    let utc: chrono::DateTime<chrono::Utc> = chrono::Utc::now();
    let root = Logger::root(
        drain_base,
        o!("ts" => format!("{}", utc.to_rfc2822()) ),
    );

    //info!(root, "foo is {foo} {bar} {baz}", bar=3, foo = 2, baz=4,);
    //info!(root, "formatted {num_entries} entries of {}", "something", num_entries = 2; "log-key" => true);
    //  info!(root, "{method} {path}", method = "POST", path = "/some"; );
    //  warn!(root,"http");
    //  error!(root,"http");
    //  trace!(root,"http");
    //  debug!(root, "debug values"; "x" => 1, "y" => -1);

    // register slog_stdlog в качестве обработчика журнала с логом для журнала
    //slog_stdlog::init().unwrap();

    let _guard = slog_scope::set_global_logger(root); //crate slog_scope глобальная регистрация

    // info!("global logger");
    slog_debug!(slog_scope::logger(), "slog_debug");
    slog_info!(slog_scope::logger(), "slog_info");
    slog_warn!(slog_scope::logger(), "slog_warn");
    slog_error!(slog_scope::logger(), "slog_error");
    //slog_trace!(slog_scope::logger(), "foo");

    //slog_scope::scope(slog_scope::logger().new(o!("where" => "Test logging scope")), || {
    //
    //});
    // debug!(" global logger");
}
</code></pre>
