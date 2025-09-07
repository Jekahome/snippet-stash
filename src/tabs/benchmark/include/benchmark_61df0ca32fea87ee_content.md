

```
rustup default nightly
cargo install cargo-remark
cargo remark build  --open

cargo install cargo-pgo
rustup component add llvm-tools-preview
cargo pgo build
cargo pgo run
cargo remark wrap -- pgo optimize

Open target/remarks/web/index.html 
```
