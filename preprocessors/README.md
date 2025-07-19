## Test

```sh
cd preprocessors
cargo build --release
cat src/input.json | target/release/mdbook-include-md


echo '{"root": ".","config": {},"renderer": "html", "mdbook_version": "0.4.44"}' | target/release/mdbook-include-md supports
true
```