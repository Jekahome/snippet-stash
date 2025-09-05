

Вам не нужно отдельно писать код для парсинга и отдельно — документацию для пользователя. Они объединены в одной строке.
Его главная особенность — это **декларативный подход**, основанный на документации.
Обычные библиотеки (like clap в режиме Builder) требуют, чтобы вы императивно описали аргументы, их типы, флаги и т.д., в коде. Docopt работает наоборот.
<pre><code class="language-rust">
use docopt::Docopt;
use serde::Deserialize;

// Write the usage string in the docopt format
const USAGE: &str = "
Usage:
    my_program.exe (--input <file> | --stdin) [--output <file>] [--verbose]
    my_program.exe --help

Options:
    -i, --input <file>   Input file to process.
    -o, --output <file>  Output file. Defaults to stdout.
    --stdin              Read input from stdin.
    -v, --verbose        Print more debug info.
    -h, --help           Show this help message.
";

// Автоматически генерируем структуру, в которую будут парситься аргументы.
// Docopt использует Serde для этого.
#[derive(Debug, Deserialize)]
struct Args {
    flag_input: Option<String>,
    flag_output: Option<String>,
    flag_stdin: bool,
    flag_verbose: bool,
}
fn main() {
    // Парсим аргументы командной строки согласно нашей спецификации USAGE
    let args: Args = Docopt::new(USAGE)
                            .and_then(|d| d.deserialize())
                            .unwrap_or_else(|e| e.exit());
    println!("{:?}", args);

    // Теперь можно использовать распарсенные значения
    if args.flag_verbose {
        println!("Verbose mode is ON");
    }
    // ... и т.д.
}
</code></pre>

Запуск:
```
my_program --input data.txt -v — будет распаршено корректно.
my_program --input data.txt --output result.txt — тоже сработает.
my_program --help — Docopt автоматически красиво выведет текст из USAGE и завершит программу.
my_program --input data.txt --stdin — вызовет ошибку, потому что в Usage: указано ИЛИ (|).
```


