

К сожалению, стандарт Rust библиотека alloc включает в себя распространенное предположение, что Выделение памяти в куче не может завершиться неудачей, и это не всегда верное предположение и скорее всего, сведется к следующему: panic! и завершение программы при недостатке памяти в куче.
```rust
fn try_build_a_vec() -> Result<Vec<u8>, String> {
    let mut v = Vec::new();

    // Perform a careful calculation to figure out how much space is needed,
    // here simplified to...
    let required_size = 4;

    v.try_reserve(required_size)
        .map_err(|_e| format!("Failed to allocate {} items!", required_size))?;

    // We now know that it's safe to do:
    v.push(1);
    v.push(2);
    v.push(3);
    v.push(4);

    Ok(v)
}
fn main(){}
```
