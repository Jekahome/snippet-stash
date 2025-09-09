


```rust
fn main(){
 let words = vec!["a", "b", "c"];
 let slice = &words[..];
 match slice {
    [] => println!("slice is empty"),
    [one] => println!("single element {}", one),
    [head, tail @ ..] => println!("head={} tail={:?}", head, tail),
 }
}
```

---

```
match slice {
    // Игнорируйте все, кроме последнего элемента, который должен быть "!".
    [.., "!"] => println!("!!!"),

    // `start` - это кусочек всего, кроме последнего элемента, который должен быть « z ».
    [start @ .., "z"] => println!("starts with: {:?}", start),

    // `end` - это фрагмент всего, кроме первого элемента, который должен быть « a ».
    ["a", end @ ..] => println!("ends with: {:?}", end),

    origin => println!("{:?}", origin),
}

if let [.., penultimate, _] = slice {
    println!("next to last is {}", penultimate);
}
```

---

```rust
fn main(){
 let tuple = (1, 2, 3, 4, 5);
 // Шаблоны tuple также могут использоваться в шаблонах структур кортежей и кортежей.
 match tuple {
    (1, .., y, z) => println!("y={} z={}", y, z),
    (.., 5) => println!("tail must be 5"),
    (..) => println!("matches everything else"),
 }
}
```

