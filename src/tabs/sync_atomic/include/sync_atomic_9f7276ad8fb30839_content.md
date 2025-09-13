

```
use std::sync::atomic::AtomicU32;
fn allocate_new_id() -> u32 {
    static NEXT_ID: AtomicU32 = AtomicU32::new(0);
    NEXT_ID.fetch_add(1, Relaxed)
}

fn main() {
  println!("{}",allocate_new_id());// 0
  println!("{}",allocate_new_id());// 1
}
```

Единственная проблема здесь — поведение переноса при переполнении. `4 294 967 296-й` вызов переполнит 32-битное целое число, так что следующий вызов снова вернет 0

Чтобы остановить увеличение NEXT_ID сверх определенного предела и предотвратить переполнение, мы можем использовать Compare_exchange для реализации атомарного сложения с верхней границей. Используя эту идею, давайте создадим версию allocate_new_id, которая всегда корректно обрабатывает переполнение, даже в практически невозможных ситуациях:
```
fn allocate_new_id() -> u32 {
    static NEXT_ID: AtomicU32 = AtomicU32::new(0);
    let mut id = NEXT_ID.load(Relaxed);
    loop {
        assert!(id < u32::MAX, "too many IDs!");
        match NEXT_ID.compare_exchange_weak(id, id + 1, Relaxed, Relaxed) {
            Ok(_) => return id,
            Err(v) => id = v,
        }
    }
}
```

Теперь мы проверяем и впадаем в панику перед изменением, гарантируя, что он никогда не увеличится больше `U32::MAX`, что делает переполнение невозможным.




