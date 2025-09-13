

```toml
[dev-dependencies]
wasm-bindgen-test = "0.3.0"
```

File: `<you crate>/tests/web.rs`:
```
#[cfg(test)]
mod test {
    use wasm_bindgen_test::*;

    #[wasm_bindgen_test]
    fn pass() {
        assert_eq!(1, 1);
    }
}
```

Run:
```
$ wasm-pack test --node
```

