

Выберите, `Borrow` когда вы хотите абстрагироваться от различных видов заимствований или когда вы строите структуру данных, которая обрабатывает собственные и заимствованные значения эквивалентными способами, такими как хеширование и сравнение.

Выберите, `AsRef` когда вы хотите преобразовать что-либо в ссылку напрямую, и вы пишете общий код.
```rust
// подходит для `&mut T` и `&T` и `T` и `mut T`
fn generic_as_ref_shared<T: AsRef<str>>(value: T) {
    println!("{:?}", value.as_ref()); 
}

fn main() {
    let s = String::from("Привет");

    generic_as_ref_shared("Привет");    // &str
    generic_as_ref_shared(&"Привет");   // &&str
    generic_as_ref_shared(&s);          // &String
    generic_as_ref_shared(&mut s.clone()); // &mut String
    generic_as_ref_shared(s);           // String
}
```
