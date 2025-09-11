

```
fn very_trustworthy(shared: &i32) {
    unsafe {
        // Преобразовать разделяемую ссылку в изменяемый указатель.
        // Это неопределенное поведение.
        let mutable = shared as *const i32 as *mut i32;
        *mutable = 20;
    }
}
```

---

```rust
#[derive(Debug)]
struct T{
    data:i32
}
fn main() {
    let t = T{data:8};
    let shared = &t;
    unsafe {
        let mutable = shared as *const T as *mut T;
        (*mutable).data=7;
    }
    assert_eq!(7,t.data);
}
```
