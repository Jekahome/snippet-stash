

`Newtype` можно использовать, чтобы скрыть детали представления, давая точные обещания клиенту.
Например, рассмотрим функцию, `my_transform` которая возвращает составной тип итератора.
```rust
#![allow(unused)]
use std::iter::{Enumerate, Skip};
pub fn my_transform<I: Iterator>(input: I) -> Enumerate<Skip<I>> {
       input.skip(3).enumerate()
}
fn main() {}
```

Мы хотим скрыть этот тип от клиента, чтобы клиент видел возвращаемый тип примерно `Iterator<Item = (usize, T)>`.
Мы можем сделать это с помощью шаблона `newtype`:
Клиент не знает, как создается или представляется итератор результата, что означает, что представление может измениться в будущем без нарушения клиентского кода.
```rust
#![allow(unused)]
fn main() {
   use std::iter::{Enumerate, Skip};
   pub struct MyTransformResult<I>(Enumerate<Skip<I>>);

   impl<I: Iterator> Iterator for MyTransformResult<I> {
       type Item = (usize, I::Item);
       fn next(&mut self) -> Option<Self::Item> {
          self.0.next()
       }
   }
    pub fn my_transform<I: Iterator>(input: I) -> MyTransformResult<I> {
       MyTransformResult(input.skip(3).enumerate())
    }
}

// impl Trait функция, которая более лаконична, чем шаблон newtype, но с некоторыми дополнительными компромиссами, а именно: impl Trait вы ограничены в том, что вы можете выразить. 
#![allow(unused)]
fn main() {
    pub fn my_transform<I: Iterator>(input: I) -> impl Iterator<Item = (usize, I::Item)> {
        input.skip(3).enumerate()
    }
}
```
