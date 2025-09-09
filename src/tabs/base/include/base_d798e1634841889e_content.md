

```
4 | 5 if y => println!("да") // y глобален
OptionalInt::Value(i) if i > 5 => println!("Получили целое больше пяти!"),
```

---

```rust
fn main() {
    let pair = (2, -2);

    println!("Расскажи мне о {:?}", pair);
    match pair {
        (x, y) if is_zero(x) => println!("Zero"),
        (x, y) if x == y => println!("Близнецы"),
        // Данное ^ `условие if` является ограничителем шаблонов
        (x, y) if x + y == 0 => println!("Антиматерия, бабах!"),
        (x, _) if x % 2 == 1 => println!("Первое число нечётно"),
        _ => println!("Нет корреляции..."),
    }
}
```

---

```
match events {
  v if v as i32 & libc::EPOLLIN == libc::EPOLLIN => {
      context.read_cb(key, epoll_fd)?;
  }
  v if v as i32 & libc::EPOLLOUT == libc::EPOLLOUT => {
      context.write_cb(key, epoll_fd)?;
      to_delete = Some(key);
  }
  v => println!("unexpected events: {}", v),
};
```
