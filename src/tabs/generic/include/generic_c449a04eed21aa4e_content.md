


```rust       
// Вариант в стиле generic, но внутренний тип Item ожидает кокретный тип Sized а не трейт Ord
// fn find_max<I: Iterator<Item = Ord>>(iter: I) -> Option<I::Item>{ ❌

// с помощью where мы сможем указать ограничения трейтом
fn find_max<I>(iter: I) -> Option<I::Item>  ✅ 
  where I:Iterator,
             I::Item: Ord {    
    iter.reduce(|a, b| {
        if a >= b { a } else { b }
    })
}
fn main(){}
```
