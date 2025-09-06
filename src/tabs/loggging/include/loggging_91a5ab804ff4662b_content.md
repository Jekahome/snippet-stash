


Для такого источника: 
<pre><code class="language-rust">
fn main(){
    let file_general = OpenOptions::new()
        .append(true)
        .create(true)
        .write(true)
        .truncate(false)
        .open(general_log_path)
        .unwrap();

    let prepare_drain: slog::Fuse<slog_json::Json<std::fs::File>> = slog_json::Json::default(file_general).fuse();
}
</code></pre>


Формат будет таким:
|  msg  |level   |              ts               |version|
|-------|--------|-------------------------------|-------|
|MESSAGE|INFO    |2024-06-05T09:02:42.908403041Z |0.1.0  |
|MESSAGE|DEBG    |2024-06-05T09:04:08.822208096Z |0.1.0  |
|MESSAGE|TRCE    |2024-06-05T09:04:08.822768038Z |0.1.0  |
|MESSAGE|ERRO    |2024-06-05T09:04:16.68434404Z  |0.1.0  |



