

* Запись в буффер 
```rust
fn main(){
    use std::fmt::Write;
    let mut s = String::new();
    write!(&mut s, "{} {}", "abc", 123).unwrap();
    assert_eq!("abc 123".to_string(), s);
}
```

* Вывод структуры
```rust
fn main(){
    struct Structure{x:i32};
    impl std::fmt::Display for Structure {
        fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
            write!(f, "({} )", self.x )
        }
    }
    println!(" `{}` ", Structure{x:3});
}
```

* write пишет в выходной поток и возвращает fmt::Result
```rust
fn main(){
    struct List(Vec<i32>);
    impl std::fmt::Display for List {
        fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
            let vec = &self.0;
            write!(f, "[")?;
            for (count, v) in vec.iter().enumerate() {
                // допишем в f запятую для вывода [0 :1, 1 :2, 2 :3]
                if count != 0 { write!(f, ", ")?; }
                write!(f, "{} :{}", count,v)?;
            }
            // Закроем открытую скобку и вернём значение `fmt::Result`
            write!(f, "]")
        }
    }
  let v = List(vec![1, 2, 3]);
  println!("{}", v);// [0 :1, 1 :2, 2 :3]
}
```

