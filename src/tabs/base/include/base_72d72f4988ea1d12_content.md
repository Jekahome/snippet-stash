

замыкание никогда не является тем же типом, что и другое замыкание, даже если сигнатура та же самая.
```rust
fn foo<F, G>(first: F, second: G) // с общим типом будет ошибка
where
    F: Fn() -> i32,
    G: Fn() -> i32,
{}

fn main() {
    let first_closure = || 9;
    let second_closure = || 9;
    foo(first_closure, second_closure);
}
```
