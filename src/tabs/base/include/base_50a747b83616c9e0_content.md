

Если порядок уничтожения захваченных значений важен для логики программы, не полагайся на порядок drop замыкания.

Rust гарантирует порядок drop для обычных локальных переменных — в обратном порядке объявления (последний объявлен — первый уничтожен). Но для захваченных значений внутри замыкания такой порядок не стабилизирован (не определён спецификацией) и может зависеть от деталей реализации компилятора.

```rust
#![allow(dropping_copy_types)]

struct SomeTypeA(i32);
struct SomeTypeB(i32);
struct SomeTypeC(i32);

impl Drop for SomeTypeA {
    fn drop(&mut self) {
        println!("SomeTypeA");
    }
}
impl Drop for SomeTypeB {
    fn drop(&mut self) {
        println!("SomeTypeB");
    }
}
impl Drop for SomeTypeC {
    fn drop(&mut self) {
        println!("SomeTypeC");
    }
}
fn main() {
    let a = SomeTypeA(1);
    let b = SomeTypeB(2);
    let c = SomeTypeC(3);
    
    let cl = move || {
         
    };
    drop(cl);
}
```

Возможный вывод (пример):
```
SomeTypeB
SomeTypeA
SomeTypeC
```

На другой версии компилятора или с `-O`:

```
SomeTypeC
SomeTypeB
SomeTypeA
```
 
 

**Нам нужно самим взять на себя реализацию порядка освобождения памяти:**

```no_run
let cl = move || {
    drop(a);
    drop(b);
    drop(c);
};
```

Либо гарантировать полями структуры.

```no_run
struct Owned {
    a: SomeTypeA,
    b: SomeTypeB,
    c: SomeTypeC,
}
impl Drop for Owned {
    fn drop(&mut self) {
        println!("Owned drop start");
        // порядок контролируется полями структуры
    }
}
fn main() {
    let owned = Owned {
        a: SomeTypeA(1),
        b: SomeTypeB(2),
        c: SomeTypeC(3),
    };

    let cl = move || {
        let _ = &owned;
    };

    drop(cl);
}
```

