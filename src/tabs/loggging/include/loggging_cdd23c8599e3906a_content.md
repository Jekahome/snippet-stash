


<pre><code class="language-rust">
use flexi_logger::{Logger, FileSpec, Age, Cleanup, Naming, Duplicate};

fn main() {
    Logger::try_with_str("debug,reqwest=info")
        .unwrap()
        .log_to_file(
            FileSpec::default()
                .directory("logs")
                .suffix("log")
        )
        .rotate(
            Age::Day,
            Cleanup::KeepLogFiles(7),
            Naming::Timestamps
        )
        .create_symlink("current.log")
        .duplicate_to_stdout(Duplicate::Info)
        .start()
        .unwrap();

    // ...
}
directory("logs"): Логи в папку logs.
suffix("log"): Файлы с расширением .log.
rotate(...): Ротация логов ежедневно, хранение за 7 дней.
Naming::Timestamps: Имена файлов с временными метками.
create_symlink("current.log"): Симлинк на текущий лог.
duplicate_to_stdout(Duplicate::Info): В консоль только info и выше.
</code></pre>
