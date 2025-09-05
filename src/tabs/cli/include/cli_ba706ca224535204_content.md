

<pre><code class="language-rust">
use std::env;
fn main() {
    let args: Vec<String> = env::args().collect();
    // Первый аргумент - это путь, по которому была вызвана программа.
    println!("My path is {}.", args[0]);
    // Остальные аргументы - это переданные параметры командной строки.
    //   $ ./args arg1 arg2
    println!("I got {:?} arguments: {:?}.", args.len() - 1, &args[1..]);
}
</code></pre>

Запуск:
```
$ ./main 1 2 3
```

---

<pre><code class="language-rust">
fn main(){
    let args: Vec<String> = std::env::args().collect(); // возвращает итератор аргументов командной строки
    println!("{:?}", args);// ["target/debug/command-line", "test", "file"] //  первое значение в векторе - "target/debug/command-line" это имя нашего двоичного файла.
}
</code></pre>

Запуск:
```
$ cargo run --bin=command-line test file
```

---

<pre><code class="language-rust">
use std::env;
fn main() {
    let args: Vec<String> = env::args().collect();
    let query = &args[1];
    let filename = &args[2];
    println!("Searching for {}", query);
    println!("In file {}", filename);
}
</code></pre>

---
  
<pre><code class="language-rust">
use std::env;
fn increase(number: i32) {
    println!("{}", number + 1);
}
fn decrease(number: i32) {
    println!("{}", number - 1);
}
fn help() {
    println!("usage:
match_args <string>
    Check whether given string is the answer.
match_args {{increase|decrease}} <integer>
    Increase or decrease given integer by one.");
}
fn main() {
    let args: Vec<String> = env::args().collect();
    match args.len() {
        // no arguments passed
        1 => {
            println!("My name is 'match_args'. Try passing some arguments!");
        },
        // one argument passed
        2 => {
            match args[1].parse() {
                Ok(42) => println!("This is the answer!"),
                _ => println!("This is not the answer."),
            }
        },
        // one command and one argument passed
        3 => {
            let cmd = &args[1];
            let num = &args[2];
            // parse the number
            let number: i32 = match num.parse() {
                Ok(n) => {
                    n
                },
                Err(_) => {
                    eprintln!("error: second argument not an integer");
                    help();
                    return;
                },
            };
            // parse the command
            match &cmd[..] {
                "increase" => increase(number),
                "decrease" => decrease(number),
                _ => {
                    eprintln!("error: invalid command");
                    help();
                },
            }
        },
        // all the other cases
        _ => {
            // show a help message
            help();
        }
    }
}
</code></pre>

Запуск:
```
$ ./match_args Rust
This is not the answer.
$ ./match_args 42
This is the answer!
$ ./match_args do something
```

