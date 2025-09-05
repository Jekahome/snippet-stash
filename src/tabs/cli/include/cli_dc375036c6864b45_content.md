

```toml
[dependencies]
clap = { version = "4.0.0", features = ["derive"] }
```

<pre><code class="language-rust">
use clap::Parser;

#[derive(Parser, Debug)]
#[command(name = "example")]
struct Args {
    /// The input file to process
    #[arg(short, long, env = "INPUT_FILE")]
    input: String,
}
fn main() {
    let args = Args::parse();

    // Печатаем значение аргумента или переменной среды
    println!("Input file: {}", args.input);
}
</code></pre>

Запуск:
```
# Запуск программы с аргументом командной строки
$ cargo run -- --input file.txt
```

Запуск программы с переменной среды:
```
$ export INPUT_FILE=file.txt
$ cargo run
```

