

`cargo test name_test`

`cargo test -- --test modname::test_name` 



Тест конкретного модуля с выводом первой ошибки
```
cargo test  --manifest-path pallets/palletmy/Cargo.toml --color always  --  --nocapture   2>&1 | grep error -A 20| head -40

cargo test --package minterest-protocol --lib -- tests::deposit_underlying_should_work --exact --nocapture
```

