


<pre><code class="language-rust">
fn main(){
    Logger::try_with_str("trace")
        .unwrap()
        .log_to_file(FileSpec::default().suppress_timestamp())
        .format_for_files(flexi_logger::detailed_format)
        .format_for_stdout(flexi_logger::colored_detailed_format)
        .print_message()
        .create_symlink("trace.log")
        .use_utc()
        .start()
        .unwrap();

    suppress_timestamp(): Без временных меток в имени файла.
    format_for_files(...): Детальный формат для файлов.
    format_for_stdout(...): Цветной формат для консоли.
    print_message(): Включает тело сообщения в вывод.
    use_utc(): Использует UTC вместо локального времени.
}
</code></pre>
