

```rust
use std::ops::{Add,Sub,Mul};

#[derive(Debug)]
struct Point {
    x: i32,
    y: i32,
}

impl  Add  for Point {
    type Output = Point;
    fn add(self, other: Point) -> Point {
        Point { x: self.x + other.x, y: self.y + other.y }
    }
}
impl  Sub  for Point {
    type Output = Point;
    fn sub(self, other: Point) -> Point {
        Point { x: self.x - other.x, y: self.y - other.y }
    }
}

impl  Mul  for Point {
    type Output = Point;
    fn mul(self, other: Point) -> Point {
        Point { x: self.x * other.x, y: self.y * other.y }
    }
}
fn main(){}
```
