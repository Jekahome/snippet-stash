

Изменяемость — это свойство либо ссылки (`&mut`), либо имени (`let mut`)

тип изменяемости — внутренняя или внешняя — определяется самим типом.

Внутренняя (interior mutability) изменяемость изменяемый объект полностью находится внутри самой структуры.
По этой причине, метод `Arc::clone()` возвращает неизменяемую ссылку (`&T`)
```rust
fn main(){
    use std::sync::Arc;

    let x = Arc::new(5);

    let y = x.clone();
    let z = x.clone();
    let w = x.clone();
}
```

---

Внешняя (exterior mutability)  изменяемость

`RefCell` возвращает изменяемую ссылку `&mut` при помощи метода `borrow_mut()`
```rust
fn main(){
    use std::cell::RefCell;

    let x = RefCell::new(42);

    let y = x.borrow_mut();
    let z = x.borrow_mut();// ошибка
}
```
