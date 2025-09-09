

```rust
const fn create_function_table() -> [fn(i32) -> i32; 2] {
    // Определяем массив указателей на функции
    [add_one, subtract_one]
}

const fn add_one(x: i32) -> i32 {
    x + 1
}

const fn subtract_one(x: i32) -> i32 {
    x - 1
}
fn main() {
    let table = create_function_table();
    let result = (table[0])(10); // Вызов функции add_one через таблицу
    println!("{}", result); // Выводит 11
}
```
