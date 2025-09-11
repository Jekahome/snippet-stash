

```rust
fn main(){
    let tuple = (1, "привет", 4.5, true);
    let (a, b, c, d) = tuple;

    let (x,y):(i32,&str) = (1,"hello");
    let x: (i32, f64, u8) = (500, 6.4, 1);

    let tuple = (1, "привет", 4.5, true);
    let (a, b, c, d) = tuple;
    println!("{:?}, {:?}, {:?}, {:?}", a, b, c, d);
}
```

---

```
// Кортеж reverse перевернутый
fn reverse(m:Matrix)->Matrix{
    let (a,b,c ,d) = (m.0,m.1,m.2,m.3);
    Matrix(d,c,b ,a)
}
```

