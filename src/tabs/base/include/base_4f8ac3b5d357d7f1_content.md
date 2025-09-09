

```rust
fn main(){
   enum E{ type1(String), type2(String), type3(String) }

    struct Type<E>{ name:E }

    let option:Type<E> =  Type {name:E::type2(" my message ".to_string())};
    
    // match
    match option.name {
        E::type1(s) => {println!("type1: {}",s)},
        E::type2(s)  => {println!("type2: {}",s)},
        E::type3(s)  => {println!("type3: {}",s)},
        _ => println!("default")
    }
    
    // if let
    if let E::type1(value) = option.name  {
        println!("type1: {}",value)
    }else if let E::type2(value) = option.name  {
        println!("type2: {}",value)
    }else if let E::type3(value) = option.name  {
        println!("type3: {}",value)
    }

  // Для простого if
  // требуется реализация #[derive(PartialEq)] для enum E
   if E::type2(" my message ".to_string()) == option.name  {
        println!("type2: {}"," my message ")
    }

  if let res = exp { one } else{ two };
}
```
