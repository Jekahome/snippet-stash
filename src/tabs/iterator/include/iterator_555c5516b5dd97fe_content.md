

Создает новый итератор, который бесконечно повторяет один элемент. 

Если тип элемента итератора, который вам нужен, не реализует Clone, или если вы не хотите сохранять повторяющийся элемент в памяти, вы можете вместо этого использовать функцию repeat_with.
```rust
use std::iter;
fn main(){
    let mut fours = iter::repeat(4);

    assert_eq!(Some(4), fours.next());
    assert_eq!(Some(4), fours.next());
    assert_eq!(Some(4), fours.next());
    assert_eq!(Some(4), fours.next());
    assert_eq!(Some(4), fours.next());

    // да, все еще четыре
    assert_eq!(Some(4), fours.next());
//-------------------------------------------
    let mut fours = iter::repeat(4).take(1);
    assert_eq!(Some(4), fours.next());
    // .. и теперь мы закончили
    assert_eq!(None, fours.next());
}
```

---

```rust
fn random(n: usize) -> Vec<u32> {
    let mut r = 92;
    std::iter::repeat_with(move || {
        r ^= r << 13;
        r ^= r >> 17;
        r ^= r << 5;
        r
    }).take(n).collect()
}
fn main() {
    let n: usize = 3;
    let indexes: Vec<usize> = (0..n).collect();
    let xs: Vec<u32> = random(n);
    println!("{:?}",xs);// [24873849, 1921449235, 163429281]
}
```
