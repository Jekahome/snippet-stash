## Test

```sh
cd ~/Projects/Rust/mdbook-test/sheets/sheets/preprocessors
cargo build --release
cat src/input.json | target/release/mdbook-include-md preprocess


echo '{"root": ".","config": {},"renderer": "html", "mdbook_version": "0.4.44"}' | target/release/mdbook-include-md supports
true
```