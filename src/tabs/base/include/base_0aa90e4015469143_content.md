

Нужно явно указывать все ветки:
* `_` матчит всё, что угодно
* `..` игнорирует остальные поля

```rust
fn main(){
 enum E {
   One(usize),
   Two { value: Vec<u32>, other: Vec<u32> },
   Tree,
 }

fn foo(e: E) {
 match e {
    E::One(x) => x,
    E::Two { value: xs, .. } => xs.len(),
    _ => 92,
  }
 }
}
```
