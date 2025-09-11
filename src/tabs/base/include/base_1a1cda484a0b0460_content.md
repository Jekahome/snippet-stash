

```rust
struct Circle {
    x: f64,
    y: f64,
    radius: f64,
} 
impl Circle {
    fn area(&self) -> f64 {
        std::f64::consts::PI * (self.radius * self.radius)
    }
    fn reference(&self) {
        println!("принимаем self по ссылке!");
    }
    fn mutable_reference(&mut self) {
        println!("принимаем self по изменяемой ссылке!");
    }
    fn takes_ownership(self) {
        println!("принимаем владение self!");
    }
    fn staticFn(){//static нет в аргументах self
        print!("hi");
    }
        fn staticFn2<T >(s:T)->T{//static
        s
    }
}
fn main(){
    let c = Circle { x: 0.0, y: 0.0, radius: 2.0 };// Обращение к структуре выделить для нее память
    c.takes_ownership();// обращение к методу
    print!("{}",Circle::staticFn2("X"));// :: обращение к статическому методу
    println!("{}", c.area());
}
```
