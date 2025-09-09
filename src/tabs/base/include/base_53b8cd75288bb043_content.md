

Расходящиеся функции. Функции которые не возвращают управление наз. diverges
```rust
fn main(){
 fn foo() {
    let x:! = return;
 }
}
```


Значение расходящейся функции может быть использовано как значение любого типа:
```rust
fn main(){
  let x: i32 = diverges();
  let x: String = diverges();
}
```

---

```rust
fn main(){
 fn test(){
    struct Point;
    enum Void {}
    fn foo(void: Void) -> Vec<Point> {
        match void {
            _ => vec![]
        }
    }
 }
}
```

---

```rust
fn server_loop() -> Result<!, ConnectionError> {
    loop {
        let (client, request) = get_request()?;
        let response = request.process();
        response.send(client);
    }
}
```
