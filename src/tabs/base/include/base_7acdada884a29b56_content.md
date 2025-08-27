



```rust
// подходит для `&mut T` и `&T` и `T` и `mut T`
fn generic_borrow<T:Borrow<String>+Debug>(value:T){
    println!("{:?}",value.borrow());   
}
```
