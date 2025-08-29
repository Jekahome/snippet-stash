


<pre><code class="language-rust">
trait MyGeneric<Rhs = Self> { // Rhs это параметр обобщённого типа по умолчанию
    type Output; // это тип-заполнитель
    fn add(self, rhs: Rhs) -> Self::Output;
}
#[derive(Debug, Copy, Clone, PartialEq)]
struct Point2 {x: i32, y: i32}

// Rhs = (i32,i32) --------------------------------
impl MyGeneric<(i32,i32)> for Point2 {
    type Output = Point2;
    fn add(self, other: (i32,i32)) -> Point2 {
        Point2 {x: self.x + other.0, y: self.y + other.1}
    }
}
#[derive(Debug, Copy, Clone, PartialEq)]
struct Point {x: i32, y: i32}

// Rhs = Point (Self) default -----------------
impl MyGeneric for Point {
    type Output = Point;
    fn add(self, other: Point) -> Point {
        Point { x: self.x + other.x, y: self.y + other.y}
    }
}
fn main() {
    assert_eq!( Point { x: 1, y: 0 }.add(Point { x: 2, y: 3 }), Point { x: 3, y: 3 } );
    assert_eq!(Point2 { x: 1, y: 0 }.add((2,3)), Point2 { x: 3, y: 3 } );  
}
</code></pre>
