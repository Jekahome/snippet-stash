


<pre><code class="language-rust">
use env_logger::{Env, Builder, Target};

fn main() {
    Builder::from_env(Env::default().default_filter_or("info"))
        .target(Target::Stdout)
        .format_timestamp_secs()
        .format_module_path(true)
        .init();

    // ...
}

default_filter_or("info"): По умолчанию уровень info.
target(Target::Stdout): Вывод в stdout (можно и в файл).
format_timestamp_secs(): Добавляет временную метку.
format_module_path(true): Показывает путь модуля.
</code></pre>
