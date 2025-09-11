


```rust
fn main(){
    let v:Vec<i32> = (0..6).filter(|x| x % 2 == 0).chain(0..6).collect();
    assert_eq!(v,vec![0, 2, 4, 0, 1, 2, 3, 4, 5]);
}
```

---

```rust
fn main(){
    let names_ru = vec![String::from("привет"), String::from("пока")];
    let names_en = vec![String::from("hello"), String::from("bay")];
    let library:Vec<_> =  names_ru.iter().zip(names_en.iter()).collect();
    for i in library.iter(){
        let (ru,en) = i;// привет=hello пока=bay
    }
// после zip соединения двух итераторов в map можно брать оба итератора как a и b
// .... names_ru.iter().zip(names_en.iter()).map(|(iter_1,iter_2)|{....})
}
```

---

```rust
fn zipmap<F: Fn(&T) -> R, T, R>(xs: &[T], fs: &[F]) -> Vec<R> {
    let iter = xs.iter().zip(fs);
    let mut res = Vec::with_capacity(iter.len()); // ^^
    for (x, f) in iter {
         res.push(f(x));
    }
    res
}
fn main(){
  let lymda = |v:&i32|->i32 {
    v*10
  };
  let res =  zipmap(&[2,3,4],&[lymda,lymda,lymda]);
  assert_eq!([20, 30, 40],&res[..]);
}
```

---

```rust
// Здесь мы берем два среза и складываем числа вместе, помещая результат в третий срез. 
pub fn foo(a: &[u8], b: &[u8], res: &mut [u8]) {
    for ((a, b), res) in a.iter().zip(b).zip(res) { *res = *a + *b; }
}
fn main(){}
```

---

```rust
#![feature(iter_array_chunks)]
fn main(){
    let mut iter = "lorem".chars().array_chunks::<3>();
    assert_eq!(iter.next(), Some(['l', 'o','r']));
    assert_eq!(iter.next(), None);
    assert_eq!(iter.into_remainder().unwrap().as_slice(), &['e','m']);
}
```

---

```rust
fn main(){
    let a = [(1, 2), (3, 4)];
    let (left, right): (Vec<_>, Vec<_>) = a.iter().cloned().unzip();
    assert_eq!(left, [1, 3]);
    assert_eq!(right, [2, 4]);
}
```

---

```rust
fn main(){
    let init = 10;
    let mut total_iter = [1, 2, 3].iter().scan(init, |state, &x| {
        *state = *state * x;
        Some(*state)
    });
    for i in total_iter{
        print!("{}",i);// 10,20,60
    }
}
```

---

```rust
struct Alternate {
        state: i32,
}
impl Iterator for Alternate {
    type Item = i32;
    fn next(&mut self) -> Option<i32> {
            let val = self.state;
            self.state = self.state + 1;
            // if it's even, Some(i32), else None
            if val % 2 == 0 { Some(val) } else { None }
    }
}
fn main(){
    let mut iter = Alternate { state: 0 };
    assert_eq!(iter.next(), Some(0)); assert_eq!(iter.next(), None); assert_eq!(iter.next(), Some(2)); assert_eq!(iter.next(), None);

    let mut iter = iter.fuse();
    assert_eq!(iter.next(), Some(4));  assert_eq!(iter.next(), None);  assert_eq!(iter.next(), None);  assert_eq!(iter.next(), None); 
    assert_eq!(iter.next(), None);
}
```
