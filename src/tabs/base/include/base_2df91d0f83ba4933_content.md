

`"{:b}"   {integer | identifier : [[character]< |^| >][+|-][#][0][width]['.' $|integer|*][identifier | ? | ''] }`

```rust
fn main(){
   println!("|{:<0width$}| ","g", width=4 );//|g   | из 4 символов выровнен по левому краю
}
```

---
   
```rust
fn main(){
    let pi = 3.141592;
    println!("|{name:<4}|", name="a");// |a   |
    println!("|{name:>4}|", name="a");// |   a|
    println!("|{name:^4}|", name="a");// | a  |
}
```

* Точность
```rust
fn main(){
    println!("|{number:>0width$}|", number=1, width=5);// |00001| добили нулями до 5 символов
    // точность
    let pi = 3.141592;
    println!("{name:1.*}", 3, name=pi);// 3.142 сократили до 3 знаков после запятой
    println!("{name:.3}",  name=pi);// 3.142
    println!("{1:.0$}", 3, pi);// 3.142
    println!("{number:.prec$}",  prec = 3, number = pi);// 3.142
}
```

* Выравнивание второй колонки
```rust
fn main(){
    for (k,v) in [("key1","fffff"),("keyyy1","gg"),("keyyyyyyy1","hhhhhhhhhhh")]{
        println!("{k:-<width$}{v:?}",  width=16, k=k, v=v );  
    } 
    /*
      key1---------------"fffff"
      keyyy1------------"gg"
      keyyyyyyy1------"hhhhhhhhhhh"
    */
}
```

* Выравнивание и ширина
```rust
fn main(){
    println!( "Hello {1:0$}!" , 5 , "x" );// Hello x    !
    println!( "Hello {:5}!" ,  "x" );     // Hello x    !
    println!( "Hello {:^1$}!" ,  "x",5 ); // Hello   x  !
    println!( "Hello {:>width$}!","x",width=5 );// Hello     x!
     // 18 длина всей строки
    println!("`{name:>18.*}` выровнять на 3 символа по правому краю", 3, name="1234.56");
}
```

