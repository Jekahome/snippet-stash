

```
        
cargo fmt --all -- --check
cargo +nightly fmt --all -- --check --unstable-features
cargo clippy -- -D warnings
cargo test --features runtime-benchmarks -p node-minterest-runtime benchmarking
cargo check
cargo audit --json
```
