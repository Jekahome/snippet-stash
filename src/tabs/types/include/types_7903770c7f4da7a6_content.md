


```rust
trait A {
  fn a(&self);
}
trait B: A {
  fn b(&self);
}
impl B for Spam {
  fn b(&self) {}
}
impl A for Spam {
  fn a(&self) {
    self.b(); // вызываем метод B!
  }
}
fn main(){}
```

---

```
 trait Fn<Args>: FnMut<Args> ....
// тут Fn - это Subtrait, а FnMut - Supertrait
```
