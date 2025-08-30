

```
# запуск nightly
$ rustup run nightly cargo build 
$ rustup run nightly cargo run --bin lessons

# псевдоним запуск nightly
$ cargo +nightly build

# запуск nightly по умолчанию для проекта
$ cd ~/projects/needs-nightly
$ rustup override set nightly

# всегда запускать версию по умолчанию:
$ rustup default nightly
$ rustup default stable
```
