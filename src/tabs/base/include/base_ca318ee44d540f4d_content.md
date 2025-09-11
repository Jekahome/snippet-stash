


```rust
fn check<T: BorrowMut<[i32]>>(mut v: T) {
    //assert_eq!(&mut [1, 2, 3], v.borrow_mut());
    let vb  = v.borrow_mut();
    
    for elem in vb.iter_mut() {
       *elem += 2;
     }
   assert_eq!(&mut [3, 4, 5], v.borrow_mut());
    // print!("{:?}",vb);
}
fn main(){
    let v = vec![1, 2, 3];
    check(v);
}
```
