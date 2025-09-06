


<pre><code class="language-rust">
use env_logger::{Builder, Target};
use std::fs::File;

fn main() {
    let file = File::create("app.log").unwrap();

    Builder::new()
        .target(Target::Pipe(Box::new(file)))
        .init();

    // Или в оба места
    Builder::new()
        .target(Target::Stdout)
        .target(Target::Pipe(Box::new(File::create("app.log").unwrap())))
        .init();
}
</code></pre>
