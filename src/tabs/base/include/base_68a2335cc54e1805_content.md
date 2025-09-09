


```rust
fn main(){
// &'_ mut T не может быть Copy так как мы получим две &mut ссылки. Но &'_ T всегда Copy

// &'_ T => Copy
    let s:String = String::from("...");
    let ls:&String = &s;
    println!("For &:{s} {ls}");// тут имеим доступ и к данным на прямую и через ссылку одновременно 

// &'_ mut T => заимствует ресурс на условиях уникального доступа
    let mut s:String = String::from("...");
    // `&'_ mut T` не реализует Copy
    // мы не можем получить доступ к данным напрямую пока живет `mut T`
    let ls:&mut String = &mut s;
    println!("For &mut:{ls}");  
    // ... тут срабатывает Drop для ls, поэтому можем обратиться к данным напрямую
    println!("For &mut:{s}");
}
```
