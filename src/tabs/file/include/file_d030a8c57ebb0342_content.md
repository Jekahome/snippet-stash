

Внутри std::path::Path и PathBuf существуют две платформенные реализации путей:

* std::path::posix::Path — реализация для Unix-подобных систем (Linux, macOS, *BSD …)
   * POSIX-пути: разделитель /, корень — /, никаких дисков (C:\)

* std::path::windows::Path — реализация для Windows.
   * Windows-пути: поддержка \ и / как разделителей, префиксы (C:\, \\server\share, \\?\ и т. д.), понятие дисков, UNC-пути.

**Если нужно «сшить несколько частей пути»**:
<pre><code class="language-rust">
use std::path::PathBuf;
fn main() {
    let path: PathBuf = ["usr", "local", "bin"].iter().collect();
    println!("{:?}", path); // "usr/local/bin" (на Windows — с '\')
// `join` объединяет путь с байтовым контейнером, используя конкретную ОС разделитель и возвращает новый путь
    let new_path = path.join("a").join("b");
}
</code></pre>
