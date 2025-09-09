

```rust
fn map< T, R, F: FnMut(&T) -> R>(xs: &[T], mut f: F) -> Vec<R>  {
    let mut res = Vec::with_capacity(xs.len());
    for x in xs {
         let y = f(x);
         res.push(y);
    }
    res
}
fn zipmap< F: Fn(&T) -> R, T, R>(xs: &[T], fs: &[F]) -> Vec< R> {
    let iter = xs.iter().zip(fs);
    let mut res = Vec::with_capacity(iter.len()); // ^^
    for (x, f) in iter {
         res.push(f(x));
    }
    res
}
fn main(){
  let mut lymda = |v:&i32|->i32 {v*10};
  let res =  map(&[1,2,3],&mut lymda);
  //println!("{:?}",res);
  assert_eq!([10, 20, 30],&res[..]);
  
  let res =  map(&[1,2,3],|v|->i32 {v*10});
  assert_eq!([10, 20, 30],&res[..]);
  
  let lymda = |v:&i32|->i32 {
    v*10
  };
  let res =  zipmap(&[2,3,4],&[lymda,lymda,lymda]);
  assert_eq!([20, 30, 40],&res[..]);
}
```
