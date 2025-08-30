

```
# install Rust
$ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
$ rust install

# установить конкретную версию
$ rustup install 1.30.0
$ rustup install nightly-2018-08-01
$ rustup install stable
$ rustup install beta
$ rustup install nightly

$ rustup -V
$ rustc --version
$ rustup --version
$ cargo --version

# установка рядом nightly
$ rustup toolchain install nightly

# обновить версии
$ rustup update
$ rustup update nightly

# обновить версию и почистить кеш
$ rustup update
$ cargo install cargo-cache --force
$ rm -rf target/
$ cargo cache -e
$ make test.unit

# обновить до stable
$ rustup update stable
   stable-x86_64-unknown-linux-gnu unchanged - rustc 1.54.0 (a178d0322 2021-07-26)
   nightly-x86_64-unknown-linux-gnu unchanged - rustc 1.56.0-nightly (2827db2b1 2021-08-01)

# удалить
$ rustup uninstall
$ rustup self uninstall
```


