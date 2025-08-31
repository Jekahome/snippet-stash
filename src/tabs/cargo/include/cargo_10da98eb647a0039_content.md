

```
$ cargo new --bin hello_world (или $ cargo new hello_world)
$ cargo build // смотри $ ./target/debug/hello_world
$ cargo run 
$ cargo build --release // смотри $ ./target/release/hello_world
```

---

```
$ cargo new --lib mylib # создаст lib.rs и папку .git
$ cargo new --vcs none --lib mylib  # создаст lib.rs  без папки .git
```

---

```
или из clon
$ git clone https://github.com/rust-lang-nursery/rand.git
$ cd rand
$ cargo build
```

---

```
$ cargo +nightly new hello-world --edition 2018
```

