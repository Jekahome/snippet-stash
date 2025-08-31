

Запустите Clippy
```
    $ cargo run --bin cargo-clippy --manifest-path=path_to_clippys_Cargo.toml

    $ cargo clippy
     # если вы хотите, чтобы при сборке предупреждений задание на сборку не выполнялось, используйте
    $ cargo clippy -- -D warnings
    # для того, чтобы также проверить тесты и функции ящиков не по умолчанию, используйте
    $ cargo clippy --all-targets --all-features -- -D warnings
    $ cargo test
    # автоматическое исправление
    $ cargo clippy --fix
    # запуск в папке example
    $ cargo clippy -p example
    # запуск в папке example без учета проверки зависимостей
    $ cargo clippy -p example -- --no-deps
```
 
Умалчивания Clippy линтов:
<pre><code class="language-rust">
fn test(unix_millis:u64)->i64{
  i64::from(unix_millis)
}

#[allow(clippy::cast_possible_truncation, clippy::cast_possible_wrap)]
fn test(unix_millis:u64)->i64{
  unix_millis as i64
}
</code></pre>
