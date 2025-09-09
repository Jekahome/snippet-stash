

Когда у вас много вложенных циклов, вы можете захотеть указать, к какому именно циклу относится `break` или `continue`
```rust
fn main(){
 'outer: for x in 0..10 {
    'inner: for y in 0..10 {
        if x % 2 == 0 { continue 'outer; } // продолжает цикл по x
        if y % 2 == 0 { continue 'inner; } // продолжает цикл по y
        println!("x: {}, y: {}", x, y);
    }
 }
}
```
