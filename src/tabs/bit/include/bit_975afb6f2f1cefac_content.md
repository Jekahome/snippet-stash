

```rust
// a - b = a + (!b + 1)
fn subtract(a: i32, b: i32) -> i32 {
    a + !b + 1
}

fn main() {
   // Вычитание
    println!("5 - 3 = {}", 5 + !3 + 1); // 2
    println!("5 - 3 = {}", subtract(5, 3)); // 2

   // Сложение
    println!("5 + 3 = {}", (5 ^ 3) + ((5 & 3) << 1)); // 8
    
    // Умножение (5 * 3 = 5 + 5 + 5)
    println!("5 * 3 = {}", (5 << 1) + (5 << 0)); // 15
    
    // Деление (грубо, только для степеней двойки)
    println!("8 / 2 = {}", 8 >> 1); // 4
}

```

---

Битовый операции, но над строками

```rust

fn main(){
    let a = "hello";
    let b = "bay";
    
    // В байты
    let a_bytes: Vec<u8> = a.bytes().collect();
    let b_bytes: Vec<u8> = b.bytes().collect();
    
    // Вычитание: a_bytes XOR b_bytes
    let sub_bytes: Vec<u8> = a_bytes.iter()
        .zip(b_bytes.iter().cycle())
        .map(|(x, y)| x ^ y)
        .collect();
    
    // Умножение: a_bytes AND b_bytes  
    let mul_bytes: Vec<u8> = a_bytes.iter()
        .zip(b_bytes.iter().cycle())
        .map(|(x, y)| x & y)
        .collect();
    
    // Сложение: a_bytes OR b_bytes
    let add_bytes: Vec<u8> = a_bytes.iter()
        .zip(b_bytes.iter().cycle())
        .map(|(x, y)| x | y)
        .collect();
    
    // Обратно в строку (если возможно)
    let sub = String::from_utf8_lossy(&sub_bytes);
    let mul = String::from_utf8_lossy(&mul_bytes);
    let add = String::from_utf8_lossy(&add_bytes);
    
    println!("a: {:?}", a_bytes);
    println!("b: {:?}", b_bytes);
    println!("a - b (XOR): {:?} = '{}'", sub_bytes, sub);
    println!("a * b (AND): {:?} = '{}'", mul_bytes, mul);
    println!("a + b (OR):  {:?} = '{}'", add_bytes, add);
}
```
