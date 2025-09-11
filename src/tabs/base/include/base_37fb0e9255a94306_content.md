

```rust
use std::ops::{Index, IndexMut};
#[derive(Debug)]
enum Side {
    Left,
    Right,
}
#[derive(Debug, PartialEq)]
enum Weight {
    Kilogram(f32),
    Pound(f32),
}
struct Balance {
    pub left: Weight,
    pub right: Weight,
}
impl Index<Side> for Balance {
    type Output = Weight;

    fn index(&self, index: Side) -> &Self::Output {
        println!("Accessing {index:?}-side of balance immutably");
        match index {
            Side::Left => &self.left,
            Side::Right => &self.right,
        }
    }
}
impl IndexMut<Side> for Balance {
    fn index_mut(&mut self, index: Side) -> &mut Self::Output {
        println!("Accessing {index:?}-side of balance mutably");
        match index {
            Side::Left => &mut self.left,
            Side::Right => &mut self.right,
        }
    }
}
fn main(){
   let mut balance = Balance {
      right: Weight::Kilogram(2.5),
      left: Weight::Pound(1.5),
   };
 // В этом случае `balance[Side::Right]` — это сахар для 
 // `*balance.index(Side::Right)`, поскольку мы только читаем
 // `balance[Side::Right]`, а не записываем его.
   assert_eq!(balance[Side::Right], Weight::Kilogram(2.5));

 // Однако в данном случае `balance[Side::Left]` — это сахар для 
 // `*balance.index_mut(Side::Left)`, поскольку мы пишем `balance[Side::Left]`.
   balance[Side::Left] = Weight::Kilogram(3.0);
}
```
