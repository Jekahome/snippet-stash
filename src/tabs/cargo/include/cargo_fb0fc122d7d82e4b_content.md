

Проверка кода перед отправкой    
```    
cargo fmt --all -- --check
cargo fmt --all -- --check --color always 2>&1 | grep Diff -A 20| head -20
```
