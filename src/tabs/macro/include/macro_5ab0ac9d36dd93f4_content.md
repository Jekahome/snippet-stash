

```
sudo mount -o remount,exec /tmp/
cargo install cargo-expand
cargo expand --theme=TwoDark   // cargo expand main --theme=TwoDark 
```

---

просмотр расширенного кода макроса

```
$ rustc +nightly -Zunpretty=expanded hello.rs
// или
$ cargo expand
```
