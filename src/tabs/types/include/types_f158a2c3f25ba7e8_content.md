


```rust
struct Point { x: f32, y: f32 }

enum Shape {
        Circle( Point, f32 ),
        Rectangle( Point, Point ),
        Triangle( Point, Point, Point )
}

fn area( sh: Shape ) -> f32 {
       match sh {
            Shape::Circle( _, radius ) => std::f32::consts::PI * radius * radius,
            Shape::Rectangle( Point { x, y }, Point { x: x2, y: y2 } ) => (x2 - x) * (y2 - y),
            Shape::Triangle( Point { x, y }, Point { x: x2, y: y2 }, Point { x: x3, y: y3 } ) =>
                0.5 * ((x - x3) * (y2 - y3) - (x2 - x3) * (y - y3))
       }
}  
fn main(){}
```
При необходимости можно игнорировать все поля, если в данной ветви сравнения записать`Circle(*)`
