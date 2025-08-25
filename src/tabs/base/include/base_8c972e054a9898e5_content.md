

<pre><code class="language-rust">
use std::fmt;
// #[derive(Debug)]
struct Point {
    x: i32,
    y: i32,
}

impl fmt::Debug for Point {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "Point {{ x: {}, y: {} }}", self.x, self.y)
    }
}
fn main(){  
 let origin = Point { x: 0, y: 0 };
 println!("The origin is: {:?}", origin);
 println!("The origin is: {:#?}", origin);
} 
</code></pre>

--- 
Если использовать вывод {} нужна реализация Display
<pre><code class="language-rust">
impl fmt::Display for Point {
        fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
            write!(f, "{} {}", self.x, self.y)
        }
}
fn main(){ println!("The origin is: {}", origin);} 
</code></pre>

--- 
Если использовать бинарный вывод `{:b}` то нужна реализация std::fmt::Binary
<pre><code class="language-rust">
struct Point2D {
    x: f64,
    y: f64,
}
impl std::fmt::Binary for Point2D {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "x:{:b},y:{:b}", self.x as i32,self.y  as i32) // delegate to i32's implementation
    }
}
fn main(){ 
 let origin = Point { x: 0, y: 0 };
 println!("The origin is: {:b}", origin);
}
</code></pre>

---- 
<pre><code class="language-rust">
use std::string::ToString;
struct Circle {
    radius: i32
}
impl ToString for Circle {
    fn to_string(&self) -> String {
        format!("Circle of radius {:?}", self.radius)
    }
}
fn main(){ 
 let circle = Circle { radius: 6 };
 println!("{}", circle.to_string());
}
</code></pre>

