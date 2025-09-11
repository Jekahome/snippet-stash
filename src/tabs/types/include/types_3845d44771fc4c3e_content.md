


```
// Следующие записи эквивалентны generic (это не трейт-обьекты):
fn use_generics<T: Trait>(x: T) {} // это синтаксис turbo-fish
fn use_impl(x: impl Trait) {}

// Это с трейт-обьектом
fn use_impl(x: &dyn Trait) {}
```
