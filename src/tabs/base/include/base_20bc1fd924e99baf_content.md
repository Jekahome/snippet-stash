

`T` также должен поддерживать копирование, чтобы Rust не пытался переместить self.side в возвращаемое значение




<pre><code class="language-rust">
use std::ops::Mul;
trait HasArea<T> {
    fn area(&self) -> T;
}

struct Square<T> {
    x: T,  
    y: T,
    side: T,
}
// возвращаемое значение это реализация Mul умножения
impl<T> HasArea<T> for Square<T>
    where T: Mul<Output=T> + Copy {
    
    fn area(&self) -> T {
        self.side * self.side
    }
}
fn main(){
 let s = Square {
    x: 0.0f64,
    y: 0.0f64,
    side: 12.0f64,
 };
 println!("Площадь s: {}", s.area());
}
</code></pre>
